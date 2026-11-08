module.exports = `
  <h2 id="sec-6">6. Security, Hardware Authentication &amp; Local Storage</h2>

  <h3>AsyncStorage Vulnerabilities vs. Hardware Enclaves</h3>
  <p><strong>AsyncStorage is inherently insecure for authentication credentials and sensitive PII.</strong> On iOS, it writes unencrypted dictionary files into the application sandbox; on Android, it stores plaintext key-value pairs inside a cleartext SQLite database (<code>RKStorage</code>). Any user with a rooted/jailbroken device, physical device access, or backup extraction tools can dump plaintext authentication tokens.</p>
  <ul>
    <li><strong>iOS Keychain Services:</strong> Encrypts secrets using hardware AES-256 keys managed by Apple's <strong>Secure Enclave</strong> processor. Access control flags (such as <code>kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly</code>) ensure keys are inaccessible while the device is locked and excluded from iCloud/iTunes backups.</li>
    <li><strong>Android Keystore System:</strong> Generates and stores cryptographic keys inside a hardware-isolated <strong>Trusted Execution Environment (TEE)</strong> or dedicated <strong>StrongBox Keymaster</strong> hardware chip. Keys never enter the Android OS application memory space.</li>
  </ul>

  <div class="code-container">
    <span class="code-label">Enterprise Hardware-Backed Token Storage (AuthVault.ts)</span>
    <pre><code>import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const SERVICE_NAME = 'com.myapp.auth';
const REFRESH_KEY = 'secure_refresh_token';

export class AuthVault {
  // Store sensitive refresh token in hardware-backed Keychain / Keystore
  static async storeRefreshToken(token: string): Promise&lt;boolean&gt; {
    try {
      if (Platform.OS === 'ios') {
        await Keychain.setGenericPassword('auth_session', token, {
          service: SERVICE_NAME,
          accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
          securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
        });
      } else {
        await SecureStore.setItemAsync(REFRESH_KEY, token, {
          keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
        });
      }
      return true;
    } catch { return false; }
  }

  // Retrieve token securely from hardware enclave
  static async getRefreshToken(): Promise&lt;string | null&gt; {
    try {
      if (Platform.OS === 'ios') {
        const credentials = await Keychain.getGenericPassword({ service: SERVICE_NAME });
        return credentials ? credentials.password : null;
      }
      return await SecureStore.getItemAsync(REFRESH_KEY);
    } catch { return null; }
  }

  // Complete session wipe on logout
  static async clearSession(): Promise&lt;void&gt; {
    if (Platform.OS === 'ios') {
      await Keychain.resetGenericPassword({ service: SERVICE_NAME });
    } else {
      await SecureStore.deleteItemAsync(REFRESH_KEY);
    }
  }
}</code></pre>
  </div>

  <h3>SSL/TLS Certificate Pinning</h3>
  <p>To defend against <strong>Man-in-the-Middle (MITM)</strong> proxy attacks (e.g., Charles Proxy, Burp Suite, rogue corporate Wi-Fi certificates), applications must pin the server's public key certificate. On Android, this is configured natively via <code>network_security_config.xml</code>:</p>

  <div class="code-container">
    <span class="code-label">Native Android Network Security Configuration (network_security_config.xml)</span>
    <pre><code>&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;network-security-config&gt;
  &lt;domain-config cleartextTrafficPermitted="false"&gt;
    &lt;domain includeSubdomains="true"&gt;api.company.com&lt;/domain&gt;
    &lt;pin-set expiration="2027-12-31"&gt;
      &lt;!-- Primary Production Public Key SHA-256 Pin --&gt;
      &lt;pin digest="SHA-256"&gt;k2v657xBsOwg11+/VZPINM8UC2F5i2S/eCr802zsLkU=&lt;/pin&gt;
      &lt;!-- Backup Disaster Recovery Public Key Pin (Prevents App Brick) --&gt;
      &lt;pin digest="SHA-256"&gt;0ZOmg4K3L3/U5yZ7aG/N2V1bM5oB9eP5q8zLkU3xRw4=&lt;/pin&gt;
    &lt;/pin-set&gt;
  &lt;/domain-config&gt;
&lt;/network-security-config&gt;</code></pre>
  </div>

  <h3>Tamper Resistance &amp; Reverse Engineering</h3>
  <ul>
    <li><strong>Hermes AOT Bytecode:</strong> Compiling with Hermes converts raw JavaScript into binary bytecode, frustrating basic text reverse engineering and string dumping.</li>
    <li><strong>ProGuard / R8 Obfuscation:</strong> Renames native classes and methods to short unreadable identifiers (<code>a.b.c</code>) and strips unused code symbols during release builds.</li>
    <li><strong>Root and Jailbreak Detection:</strong> Use native checks (e.g., via <code>react-native-jail-monkey</code>) to detect Cydia, Substrate, Magisk, test-keys, and SELinux enforcement violations. Prevent financial operations on compromised devices.</li>
    <li><strong>Never Embed Secrets in JavaScript:</strong> Client-side bundles can always be decompiled. Private API keys, AWS credentials, and payment signing secrets must reside strictly on your backend server.</li>
  </ul>

  <h3>Token Rotation &amp; Session Management Pattern</h3>
  <p>Modern mobile security mandates a <strong>Dual-Token Rotation Strategy</strong>: short-lived Access Tokens (15 minutes) kept in memory, and long-lived Refresh Tokens (30 days) stored in hardware Keychain/Keystore. Axios HTTP interceptors intercept 401 Unauthorized responses, acquire a mutex lock, request a new token pair, and replay the original queued requests seamlessly.</p>

  <div class="qa-section">
    <h3>Quick Review — Security, Hardware Auth &amp; Storage (Q39 – Q43)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q39</span> Why is AsyncStorage insecure for storing authentication tokens?</div>
      <div class="qa-a">AsyncStorage is an unencrypted key-value storage engine. On Android, it writes keys and values as plaintext rows into an unencrypted SQLite database located at <code>/data/data/&lt;package&gt;/databases/RKStorage</code>. On iOS, it stores plaintext files inside the app's Documents sandbox. Any compromised device (rooted/jailbroken) or forensic device backup allows attackers to extract tokens effortlessly. Always store tokens in <strong>iOS Keychain</strong> or <strong>Android Keystore</strong> via <code>react-native-keychain</code> or <code>expo-secure-store</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q40</span> What is SSL Pinning and how do you implement it in React Native?</div>
      <div class="qa-a">SSL Pinning enforces that the mobile app only accepts HTTPS connections matching a specific cryptographic public key or leaf certificate hash, blocking attackers who inject custom CA root certificates to perform MITM inspection. Implement it natively on Android using <code>network_security_config.xml</code>, and on iOS using TrustKit or native networking libraries. <em>Critical Rule:</em> Always include at least one backup pin to prevent bricking the mobile application when backend certificates are rotated.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q41</span> How does Face ID / Touch ID biometric authentication work in React Native?</div>
      <div class="qa-a">Biometric authentication does not compare raw biometric data in JavaScript. Instead, the native library (<code>expo-local-authentication</code> or <code>react-native-keychain</code>) invokes the OS hardware security framework (<code>LocalAuthentication.framework</code> on iOS, <code>BiometricPrompt</code> on Android). The OS hardware enclave performs the facial/fingerprint scan. Upon successful verification, the hardware enclave unlocks the requested cryptographic key from the Keychain/Keystore, which is then used to sign requests or decrypt tokens.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q42</span> Explain the JWT access/refresh token rotation strategy.</div>
      <div class="qa-a">
        <ol>
          <li>The app holds a short-lived Access Token (15m expiry) in volatile memory (never written to disk).</li>
          <li>A long-lived Refresh Token (30d expiry) is stored securely in hardware Keychain/Keystore.</li>
          <li>When an API request returns <code>401 Unauthorized</code>, a network interceptor pauses outgoing requests, sends the refresh token to the authentication server, and receives a brand new access/refresh token pair (invalidating the old refresh token).</li>
          <li>The interceptor stores the new refresh token, updates the access token in memory, and replays all paused requests.</li>
        </ol>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q43</span> What security measures protect a React Native app against reverse engineering?</div>
      <div class="qa-a">
        <ul>
          <li><strong>Hermes Bytecode:</strong> Build with Hermes enabled so code ships as compiled bytecode (<code>.hbc</code>) rather than readable JavaScript text.</li>
          <li><strong>ProGuard / R8:</strong> Enable code shrinking, class obfuscation, and unused code removal for Android release builds in <code>build.gradle</code>.</li>
          <li><strong>Zero Secrets in Bundle:</strong> Never store secret keys, private credentials, or signing certificates inside <code>.env</code> files bundled into the app.</li>
          <li><strong>Root / Jailbreak Detection:</strong> Probe for binary artifacts (Su binary, Substrate, Magisk) and restrict banking/payment capabilities on rooted devices.</li>
          <li><strong>Tamper Checks:</strong> Verify code signatures and checksums at runtime before executing critical workflows.</li>
        </ul>
      </div>
    </div>
  </div>
`;
