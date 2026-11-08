module.exports = `
  <h2 id="sec-9">9. App Lifecycle, OS Integration, Headless Tasks &amp; Notifications</h2>

  <h3>AppState Transitions and Handling App Suspension</h3>
  <div class="diagram-box">====================================================================================================
APP STATE LIFECYCLE & TRANSITIONS
====================================================================================================
+-------------------------------------------------------------+
|                     [Active (Foreground)]                   |
+-------------------------------------------------------------+
             ^                                     |
             |                                     v
+-----------------------------+       +-----------------------------+
| [Inactive (iOS Transitions)]|       |   [Background (App Hidden)] |
+-----------------------------+       +-----------------------------+
                                                     |
                                                     v
                                      [OS Suspends Process (Zero CPU)]
                                                     |
                                                     v (Under Memory Pressure)
                                      [Process Terminated by Mobile OS]</div>

  <p>React Native's <code>AppState</code> module tracks three distinct application states:</p>
  <ul>
    <li><strong><code>active</code>:</strong> The application is in the foreground, receiving touches, and rendering at full frame rate.</li>
    <li><strong><code>inactive</code> (iOS only):</strong> A transitional state occurring during phone calls, Notification Center pull-downs, Face ID prompts, or app switcher activation. No user touches are processed.</li>
    <li><strong><code>background</code>:</strong> The user navigated to the home screen or switched to another app. On iOS, the app receives approximately 5-30 seconds of execution time before the OS pauses the process completely (allocating 0 CPU cycles). If device memory becomes scarce, the OS terminates the process silently without firing any further JavaScript callbacks.</li>
    <li><strong>Safe Backgrounding Strategy:</strong> When <code>AppState</code> transitions to <code>background</code>, immediately flush unsaved Redux/Zustand state to disk (MMKV/AsyncStorage), pause video playback, close active WebSocket connections, and cancel long polling intervals.</li>
  </ul>

  <h3>Background Tasks: Android HeadlessJS vs. iOS Background Tasks</h3>
  <ul>
    <li><strong>Android HeadlessJS:</strong> A mechanism allowing JavaScript code to execute inside a native Android Service without launching any UI Activity. The service starts the React context, executes a registered JavaScript task, and terminates automatically. Ideal for background geofence triggers, network sync, or FCM data messages received while the app is closed.</li>
    <li><strong>iOS BackgroundTasks Framework:</strong> iOS does not allow arbitrary background JS execution. It relies on <code>BGAppRefreshTask</code> (short 30-second maintenance pings scheduled by the OS) and <code>BGProcessingTask</code> (long-running tasks scheduled when the device is idle and connected to power).</li>
  </ul>

  <div class="code-container">
    <span class="code-label">HeadlessJS Geofence Worker Registration (index.js)</span>
    <pre><code>import { AppRegistry } from 'react-native';
import App from './src/App';

// 1. Standard foreground UI application entry
AppRegistry.registerComponent('MyApp', () => App);

// 2. Headless background task registered with identical name as Native Android Service
AppRegistry.registerHeadlessTask('GeofenceWorkerTask', () => async (taskData) => {
  const { geofenceId, eventType, latitude, longitude } = taskData;
  console.log(\`[HeadlessJS] Geofence event: \${eventType} at \${latitude}, \${longitude}\`);

  try {
    // Perform background data synchronization
    await fetch('https://api.company.com/geofence-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ geofenceId, eventType, timestamp: Date.now() }),
    });
  } catch (error) {
    console.error('[HeadlessJS] Failed to upload geofence ping:', error);
  }
});</code></pre>
  </div>

  <h3>Push Notifications: APNs vs. FCM Debugging</h3>
  <table>
    <thead>
      <tr>
        <th>Push Dimension</th>
        <th>Apple Push Notification service (APNs)</th>
        <th>Firebase Cloud Messaging (FCM)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Token Architecture</strong></td>
        <td>Generates a 64-character hexadecimal device token tied to Apple developer certificates and app bundle ID.</td>
        <td>Generates an FCM Registration Token. On iOS, FCM wraps the underlying APNs token.</td>
      </tr>
      <tr>
        <td><strong>Silent / Data-Only Pushes</strong></td>
        <td>Requires payload with <code>"content-available": 1</code>, no <code>alert</code>, and <code>apns-priority: 5</code>. Wakes app for ~30s.</td>
        <td>Requires <code>data</code> payload without top-level <code>notification</code> block. Wakes app via <code>setBackgroundMessageHandler</code>.</td>
      </tr>
      <tr>
        <td><strong>Production Gotcha</strong></td>
        <td>APNs sandbox vs production certificate mismatch. Push notifications fail silently in production if built with Development provisioning.</td>
        <td>Android 13+ requires explicit runtime permission: <code>android.permission.POST_NOTIFICATIONS</code>.</td>
      </tr>
    </tbody>
  </table>

  <h3>Deep Links, Universal Links &amp; App Links</h3>
  <div class="diagram-box">====================================================================================================
UNIVERSAL LINKS (iOS) & APP LINKS (Android) DOMAIN VERIFICATION
====================================================================================================
[User Taps https://company.com/product/42]
       |
       +---> iOS verifies domain against: https://company.com/.well-known/apple-app-site-association
       |     (If App ID matches Team Prefix -> Launches App directly with zero Safari redirects)
       |
       +---> Android verifies domain against: https://company.com/.well-known/assetlinks.json
             (If Package Name matches SHA-256 fingerprint -> Opens App directly with zero browser prompt)</div>

  <h3>Safe Area Insets, Notches &amp; Dynamic Island</h3>
  <p>Modern mobile devices feature hardware cutouts, curved corners, and dynamic hardware pills (Dynamic Island). Relying on default <code>SafeAreaView</code> from core React Native is discouraged because it only supports iOS and does not update during orientation changes. Instead, use <strong><code>react-native-safe-area-context</code></strong>:</p>
  <ul>
    <li>Wrap the root component with <code>&lt;SafeAreaProvider&gt;</code>.</li>
    <li>Consume precise physical insets via <code>const insets = useSafeAreaInsets()</code> (providing <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code> in points).</li>
    <li>Apply insets as padding or margins to ensure interactive buttons never collide with the iPhone home indicator bar or Android navigation gestures.</li>
  </ul>

  <h3>Splash Screen Implementation (Preventing White Screen Flash)</h3>
  <p>When React Native boots, there is a latency gap between native binary startup and initial JavaScript evaluation. If unmanaged, users see an unstyled white screen flash. Using <strong><code>expo-splash-screen</code></strong> or <strong><code>react-native-bootsplash</code></strong>:</p>
  <ul>
    <li>Call <code>SplashScreen.preventAutoHideAsync()</code> at the top of <code>index.js</code> to keep the native launch screen visible.</li>
    <li>Preload fonts, restore authentication tokens, and initialize caches.</li>
    <li>Call <code>SplashScreen.hideAsync()</code> only after the root navigation container finishes its first paint.</li>
  </ul>

  <div class="qa-section">
    <h3>Quick Review — App Lifecycle &amp; OS Integration (Q54 – Q58)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q54</span> How does AppState behave during transitions and how do you safely handle backgrounding tasks?</div>
      <div class="qa-a">React Native exposes <code>AppState.currentState</code> with values: <code>active</code>, <code>inactive</code> (iOS only), and <code>background</code>. When transitioning to <code>background</code>, the OS gives the app a brief window (5-30s) before suspending CPU execution. To handle backgrounding safely: subscribe to <code>AppState.addEventListener('change', ...)</code>, immediately persist dirty memory states (draft form data, active store) to MMKV/AsyncStorage, pause audio/video players, disconnect real-time WebSockets, and stop high-frequency polling intervals.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q55</span> What is a Headless JS Task and when would you use it?</div>
      <div class="qa-a">A Headless JS Task is an Android-specific feature allowing JavaScript code to execute inside a native Android Service without launching any UI Activity or opening the app. Use it to handle background push notifications (FCM data-only messages), geofence entry/exit pings, background file uploads, or periodic health syncs. Register the task in <code>index.js</code> using <code>AppRegistry.registerHeadlessTask('TaskName', () =&gt; taskFunction)</code>. Note: iOS does not have HeadlessJS; iOS background execution is handled via BackgroundTasks framework.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q56</span> How do you configure Deep Links, Universal Links (iOS), and Android App Links?</div>
      <div class="qa-a">
        <ul>
          <li><strong>Custom URL Schemes (<code>myapp://path</code>):</strong> Configured in <code>Info.plist</code> (URL Types) and <code>AndroidManifest.xml</code>. Limitation: If the app is not installed, the browser shows an unhandled error.</li>
          <li><strong>Universal Links (iOS):</strong> Standard HTTPS links (<code>https://myapp.com/item/1</code>). Host an <code>apple-app-site-association</code> JSON file at <code>https://myapp.com/.well-known/</code> declaring your App ID (TeamID.BundleID). Configure the <code>Associated Domains</code> entitlement in Xcode as <code>applinks:myapp.com</code>.</li>
          <li><strong>Android App Links:</strong> Host an <code>assetlinks.json</code> file at <code>https://myapp.com/.well-known/</code> declaring your package name and SHA-256 certificate fingerprint. In <code>AndroidManifest.xml</code>, add <code>android:autoVerify="true"</code> inside your intent filter.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q57</span> How do you implement push notifications in React Native (FCM + APNs)?</div>
      <div class="qa-a">Use <code>@react-native-firebase/messaging</code> or <code>expo-notifications</code>:
        <ol>
          <li><strong>Token Registration:</strong> Request permissions using <code>messaging().requestPermission()</code>. On iOS, register with APNs; Firebase automatically exchanges the APNs device token for an FCM registration token. Send this token to your backend.</li>
          <li><strong>Foreground Messages:</strong> Listen via <code>messaging().onMessage(async remoteMessage =&gt; { ... })</code> and display a local in-app alert or banner.</li>
          <li><strong>Background / Killed State:</strong> Register a top-level handler in <code>index.js</code> via <code>messaging().setBackgroundMessageHandler(async remoteMessage =&gt; { ... })</code>.</li>
          <li><strong>Notification Opened:</strong> Handle deep-linking navigation via <code>messaging().onNotificationOpenedApp()</code> (from background) and <code>messaging().getInitialNotification()</code> (from cold boot).</li>
        </ol>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q58</span> How do you implement Splash Screen and eliminate the white flash on app startup?</div>
      <div class="qa-a">The white flash happens because the native window launches before the JavaScript bundle finishes parsing and rendering. To fix this:
        <ol>
          <li>Install <code>expo-splash-screen</code> or <code>react-native-bootsplash</code>.</li>
          <li>In <code>index.js</code> or <code>App.tsx</code>, immediately execute <code>SplashScreen.preventAutoHideAsync()</code>. The OS will hold the native storyboard / XML splash screen over the screen.</li>
          <li>Load fonts, restore persisted state from storage, and verify authentication tokens.</li>
          <li>Once the root screen components mount, call <code>SplashScreen.hideAsync()</code> to provide a seamless, flicker-free transition into the application.</li>
        </ol>
      </div>
    </div>
  </div>
`;
