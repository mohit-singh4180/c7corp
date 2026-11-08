module.exports = `
  <h2 id="sec-12">12. Production Troubleshooting Matrix &amp; Upgrade Guides</h2>

  <h3>Upgrading Major React Native Versions (e.g., 0.70 to 0.76+)</h3>
  <p>Upgrading React Native across major versions involves migrating native build scripts, Gradle configurations, CocoaPods podspecs, and C++ compilation flags:</p>
  <ul>
    <li><strong>Step 1: Inspect the React Native Upgrade Helper:</strong> Navigate to <code>upgrade-helper.dev</code>, input your exact starting version and target version, and view the precise git diff across all native files in <code>/ios</code> and <code>/android</code>.</li>
    <li><strong>Step 2: Update JavaScript &amp; Expo Dependencies:</strong> Update <code>react-native</code> and <code>react</code> in <code>package.json</code>. In Expo projects, run <code>npx expo install --fix</code> to align all library versions with the target SDK.</li>
    <li><strong>Step 3: Migrate to the New Architecture:</strong> Set <code>newArchEnabled=true</code> in <code>android/gradle.properties</code> and run <code>RCT_NEW_ARCH_ENABLED=1 pod install</code> inside <code>/ios</code>. Audit third-party packages to ensure they support TurboModules and Fabric.</li>
    <li><strong>Step 4: Clean Build Artifacts &amp; Caches:</strong>
      <pre><code># Complete clean rebuild workflow
rm -rf node_modules ios/Pods ios/build android/app/build
npm cache clean --force
npm install
cd ios &amp;&amp; pod deintegrate &amp;&amp; pod cache clean --all &amp;&amp; pod install &amp;&amp; cd ..
npx react-native start --reset-cache</code></pre>
    </li>
  </ul>

  <h3>Production Scenarios: Root Cause &amp; Resolution Matrix</h3>
  <table>
    <thead>
      <tr>
        <th>Production Failure Scenario</th>
        <th>Root Cause</th>
        <th>Immediate Architectural Resolution</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Android Release Crash, Debug Works</strong></td>
        <td>ProGuard / R8 code shrinking strips JNI native classes or reflection models at release build time.</td>
        <td>Add keep rules in <code>proguard-rules.pro</code>: <code>-keep class com.facebook.react.** { *; }</code> and keep rules for the affected third-party native libraries.</td>
      </tr>
      <tr>
        <td><strong>White / Blank Screen on Cold Launch</strong></td>
        <td>An unhandled JavaScript runtime exception occurs before the root navigation container mounts.</td>
        <td>Check Metro / Sentry logs. Wrap the root app component inside a top-level <strong>React ErrorBoundary</strong> to display a fallback error view.</td>
      </tr>
      <tr>
        <td><strong>Silent iOS Push Notification Failure</strong></td>
        <td>App built with Development provisioning profile receiving Production APNs pushes, or missing Background Modes entitlement.</td>
        <td>Verify <code>aps-environment</code> matches (<code>production</code> for App Store). Enable <strong>Remote notifications</strong> under Background Modes in Xcode.</td>
      </tr>
      <tr>
        <td><strong>Android Out-of-Memory (OOM) on Scroll</strong></td>
        <td>Uncompressed high-resolution camera images decoded directly into the Android bitmap heap.</td>
        <td>Replace core <code>Image</code> with <code>react-native-fast-image</code> or <code>expo-image</code>; enable downsampling to target viewport size.</td>
      </tr>
      <tr>
        <td><strong>Universal Links Open in Safari</strong></td>
        <td>Apple App Site Association (<code>apple-app-site-association</code>) file not served over HTTPS or missing <code>application/json</code> MIME type.</td>
        <td>Verify AASA via Apple CDN: <code>https://app-site-association.cdn-apple.com/a/v1/yourdomain.com</code>. Check Associated Domains entitlement prefix.</td>
      </tr>
      <tr>
        <td><strong>Memory Leak from Modal Open/Close</strong></td>
        <td>Detached native presentation view controllers retaining JavaScript callback closures in memory.</td>
        <td>Ensure all listeners and timers are cleanly removed when the modal unmounts. Nullify callback refs.</td>
      </tr>
      <tr>
        <td><strong>AsyncStorage Data Loss After App Update</strong></td>
        <td>Native app bundle identifier or shared container group changed, causing iOS to isolate storage in a new sandbox.</td>
        <td>Ensure <code>CFBundleIdentifier</code> remains identical. Implement a migration script copying old container data.</td>
      </tr>
      <tr>
        <td><strong>RTL Layout Corruption in Arabic/Hebrew</strong></td>
        <td>Hardcoded <code>left</code> and <code>right</code> layout styles instead of bidirectional Flexbox properties.</td>
        <td>Replace <code>marginLeft</code> / <code>marginRight</code> with <code>marginStart</code> and <code>marginEnd</code>. Check <code>I18nManager.isRTL</code>.</td>
      </tr>
      <tr>
        <td><strong>Redux Store Performance Lag</strong></td>
        <td>Unmemoized selectors causing massive full-tree re-renders on low-end Android devices.</td>
        <td>Use <code>createSelector</code> (Reselect) for derived state; migrate high-frequency transient state to local Zustand slices.</td>
      </tr>
      <tr>
        <td><strong>CodePush / OTA Update Silent Failure</strong></td>
        <td>OTA release targeted at binary version mismatch, or JS bundle contains calls to missing native code.</td>
        <td>Ensure target binary version (<code>targetBinaryVersion</code>) matches the installed native app version exactly.</td>
      </tr>
      <tr>
        <td><strong>Background HeadlessJS Fails on Android 12+</strong></td>
        <td>Android 12+ restrictions block apps from launching background services from the background.</td>
        <td>Use <strong>Android WorkManager</strong> or promote the service to a <strong>Foreground Service</strong> with a user notification.</td>
      </tr>
      <tr>
        <td><strong>Native Module Breakage After Upgrade</strong></td>
        <td>Native module updated without updating JavaScript contract signatures, breaking Codegen specs.</td>
        <td>Regenerate Codegen specs: run <code>npx react-native codegen</code> and verify method signatures in TypeScript interfaces.</td>
      </tr>
    </tbody>
  </table>

  <div class="qa-section">
    <h3>Quick Review — Production Troubleshooting (Q70 – Q74)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q70</span> How do you upgrade a React Native app across major versions (e.g. 0.70 to 0.76+)?</div>
      <div class="qa-a">
        <ol>
          <li>Open <code>upgrade-helper.dev</code> to inspect the exact line-by-line diff for Xcode and Gradle project files.</li>
          <li>Update <code>package.json</code> dependencies and run <code>npx expo install --fix</code> (or manual <code>npm install</code>).</li>
          <li>If upgrading to the New Architecture (0.76+ defaults to New Architecture), set <code>newArchEnabled=true</code> in <code>gradle.properties</code> and rebuild CocoaPods with <code>RCT_NEW_ARCH_ENABLED=1 pod install</code>.</li>
          <li>Clean caches: delete <code>node_modules</code>, <code>ios/Pods</code>, <code>android/app/build</code>, and start Metro with <code>--reset-cache</code>.</li>
        </ol>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q71</span> The app shows a white/blank screen on launch — how do you diagnose it?</div>
      <div class="qa-a">A blank screen indicates a fatal JavaScript crash occurring before the root component tree can mount.
        <ul>
          <li>Connect physical device or emulator to Metro and observe terminal output for red-box syntax errors or missing module exceptions.</li>
          <li>On iOS, inspect native logs in <strong>Console.app</strong> filtering by process name. On Android, run <code>adb logcat *:E | grep ReactNative</code>.</li>
          <li>Verify native splash screen is configured to stay visible until JS signals completion via <code>SplashScreen.hideAsync()</code>.</li>
          <li>Wrap the root component in an <code>ErrorBoundary</code> component to display fallback diagnostic information.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q72</span> The Android app crashes immediately on launch in release mode but works in debug — what do you check?</div>
      <div class="qa-a">
        <ul>
          <li><strong>ProGuard / R8 Stripping:</strong> Release builds enable code shrinking and obfuscation. If native modules use reflection or JNI to call Kotlin/Java classes, R8 may strip them. Add keep rules in <code>android/app/proguard-rules.pro</code>.</li>
          <li><strong>Hermes Bytecode Compilation:</strong> Check if a JavaScript syntax construct or Babel polyfill failed bytecode compilation during <code>bundleReleaseJsAndAssets</code>.</li>
          <li><strong>Missing Assets:</strong> Verify raw images and fonts are bundled correctly in <code>android/app/src/main/res/drawable-*</code>.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q73</span> How do you reduce iOS/Android binary size for App Store submission?</div>
      <div class="qa-a">
        <ul>
          <li><strong>Enable Hermes:</strong> Replaces the bulky JavaScriptCore runtime, saving ~15MB.</li>
          <li><strong>Android App Bundle (AAB):</strong> Generates split APKs per CPU architecture (arm64-v8a, armeabi-v7a) and screen density via the Google Play Store.</li>
          <li><strong>ProGuard / R8:</strong> Set <code>enableProguardInReleaseBuilds = true</code> to strip dead native code and unused libraries.</li>
          <li><strong>Split Vector Icons:</strong> Never import all icon sets from <code>react-native-vector-icons</code>; configure Gradle font filtering to bundle only the exact font families used.</li>
          <li><strong>Asset Optimization:</strong> Convert PNGs and JPEGs to WebP format, or load media dynamically from a CDN.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q74</span> How do you handle a crash caused by a native module upgrade breaking the JS API contract?</div>
      <div class="qa-a">
        <ol>
          <li>Compare the TypeScript specification file against the native Swift / Kotlin header method signatures.</li>
          <li>In the New Architecture, re-run <strong>Codegen</strong> to regenerate C++ glue code and bindings.</li>
          <li>Clean native build artifacts: run <code>cd android &amp;&amp; ./gradlew clean</code> and <code>cd ios &amp;&amp; rm -rf build &amp;&amp; pod install</code>.</li>
          <li>Ensure JavaScript call sites pass parameters matching the expected types (e.g., verifying nullable arguments and callback vs Promise patterns).</li>
        </ol>
      </div>
    </div>
  </div>
`;
