module.exports = `
  <h2 id="sec-8">8. Memory Management, Debugging &amp; Crash Analysis</h2>

  <h3>Tracing Native &amp; JavaScript Memory Leaks</h3>
  <p>Memory leaks in React Native can originate in both the JavaScript runtime (Hermes) and native host layers (iOS/Android):</p>
  <ul>
    <li><strong>JavaScript Memory Leaks:</strong> Caused by global event listeners not removed in <code>useEffect</code> cleanup functions, uncleared timers (<code>setInterval</code>), or closures capturing large component scopes. Profile using Chrome DevTools or Flipper: take two heap snapshots (before and after navigating into and out of a screen) and inspect <strong>Objects Allocated Between Snapshots</strong> for retaining references.</li>
    <li><strong>iOS Native Leaks:</strong> Profile using <strong>Xcode Instruments</strong> with the <strong>Leaks</strong> and <strong>Allocations</strong> templates. Use the <em>Mark Generation</em> button before opening a screen and after dismissing it; any surviving native objects are highlighted in red as leaked native memory.</li>
    <li><strong>Android Native Leaks:</strong> Profile using the <strong>Android Studio Profiler</strong>. Capture a <strong>Heap Dump</strong> and search for retained <code>Activity</code> or <code>ReactContext</code> instances. In debug builds, integrate <strong>LeakCanary</strong> to automatically detect and dump retained native view hierarchies.</li>
  </ul>

  <div class="code-container">
    <span class="code-label">Resolving Retain Cycles in Native iOS Modules (BridgeModule.swift)</span>
    <pre><code>import Foundation

@objc(LocationTracker)
class LocationTracker: NSObject {
  private var updateTimer: Timer?
  private var onLocationUpdate: ((NSDictionary) -> Void)?

  @objc func startTracking(_ callback: @escaping RCTResponseSenderBlock) {
    // ❌ RETAIN CYCLE: self strongly captures closure, and closure strongly captures self
    // self.onLocationUpdate = { data in self.processUpdate(data) }

    // ✅ FIX: Break retain cycle using [weak self] capture list
    self.onLocationUpdate = { [weak self] data in
      guard let strongSelf = self else { return }
      strongSelf.processUpdate(data)
    }

    // Pass weak self to timers to prevent Timer run-loop retention
    self.updateTimer = Timer.scheduledTimer(
      withTimeInterval: 5.0,
      repeats: true
    ) { [weak self] _ in
      self?.fireLocationPing()
    }
  }

  @objc func stopTracking() {
    updateTimer?.invalidate()
    updateTimer = nil
    onLocationUpdate = nil
  }
}</code></pre>
  </div>

  <h3>Symbolicating Production Crash Logs</h3>
  <p>Production crash logs from tools like Sentry, Bugsnag, or Firebase Crashlytics often contain raw memory addresses rather than readable source lines. Resolving them requires 3 separate symbolication artifacts:</p>
  <ul>
    <li><strong>Hermes Bytecode Source Maps:</strong> When building release bundles with Hermes, Metro generates a minified JS bundle and source map, and Hermes compiles that into <code>.hbc</code> bytecode. Use <code>hermes-engine/tools/source-map-eval</code> or upload both the Metro source map and the Hermes compiler map to Sentry using the Sentry CLI to translate bytecode offsets back to TypeScript line numbers.</li>
    <li><strong>iOS dSYM (Debug Symbol) Files:</strong> Compiled iOS machine code strips function names. Xcode generates <code>.dSYM</code> bundles during the archive process. Fastlane automatically uploads dSYMs to Sentry/Crashlytics via <code>upload_symbols_to_sentry</code>.</li>
    <li><strong>Android ProGuard / R8 Mapping:</strong> Gradle R8 obfuscates class and method names. Gradle generates <code>app/build/outputs/mapping/release/mapping.txt</code>, which must be uploaded to the crash reporting dashboard to translate obfuscated stack traces (e.g., <code>a.b.c()</code>) back to original Kotlin/Java names.</li>
  </ul>

  <h3>The Legacy Bridge Deadlock Scenario</h3>
  <div class="diagram-box">====================================================================================================
LEGACY BRIDGE DEADLOCK SCENARIO
====================================================================================================
[JavaScript Thread]  ---(Calls Synchronous Native Method)--->  [Waiting on Native Thread Response]
         |                                                                    |
         |                                                                    v
         |                                                   [Native Main UI Thread Blocked]
         |                                                   Waiting for Lock held by JS Thread
         |                                                                    |
         =====================================================================v=====================
         DEADLOCK: Both threads wait on each other indefinitely.
         - The native UI event loop stops responding.
         - All JavaScript timeouts, promises, and UI updates freeze permanently.
         ===========================================================================================</div>

  <h3>Diagnosing App Startup Time (Native vs. JS Initialization)</h3>
  <ul>
    <li><strong>Phase 1: Native OS Init (Cold Start):</strong> Time from process fork until <code>Application.onCreate()</code> / <code>didFinishLaunchingWithOptions</code> finishes initializing native SDKs. Profile using Android Systrace/Perfetto or Xcode Time Profiler.</li>
    <li><strong>Phase 2: JS Engine &amp; Bundle Loading:</strong> Time spent by Hermes reading bytecode and executing top-level JavaScript imports. Minimize by enabling <strong>Hermes</strong> and configuring Metro's <code>inlineRequires: true</code>.</li>
    <li><strong>Phase 3: React Mount to First Paint (TTI):</strong> Time taken by React to evaluate the root navigation container and render the initial visual screen. Measure using <code>PerformanceObserver</code> or custom native startup markers.</li>
  </ul>

  <div class="qa-section">
    <h3>Quick Review — Memory, Debugging &amp; Crashes (Q49 – Q53)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q49</span> How do you identify and fix a memory leak in a React Native application?</div>
      <div class="qa-a">
        <ol>
          <li><strong>Identify:</strong> Use Xcode Instruments (Allocations/Leaks) on iOS or Android Studio Profiler (Heap Dump) on Android. Perform navigation cycles: open the suspect screen, perform user actions, and navigate back. Repeat 5 times. If native memory and heap allocations continuously increase without returning to baseline, a leak exists.</li>
          <li><strong>Locate:</strong> Filter retained objects by screen name or check for uncleared event subscriptions (<code>DeviceEventEmitter</code>, <code>AppState</code>, <code>NetInfo</code>).</li>
          <li><strong>Fix:</strong> Ensure all subscriptions and intervals are cleaned up in <code>useEffect</code> return functions:
            <pre><code>useEffect(() => {
  const sub = AppState.addEventListener('change', handleAppState);
  return () => sub.remove(); // Clean up subscription on unmount
}, []);</code></pre>
          </li>
        </ol>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q50</span> What causes retain cycles on the native side when interacting with React Native?</div>
      <div class="qa-a">Retain cycles on iOS occur when a native module closure captures <code>self</code> strongly while <code>self</code> simultaneously holds a strong reference to the closure block. Because Automatic Reference Counting (ARC) requires an object's reference count to hit zero to deallocate it, neither object can ever be freed. Resolve by adding <code>[weak self]</code> in Swift or <code>__weak typeof(self) weakSelf</code> in Objective-C. On Android, retain cycles happen when background Kotlin coroutines or static handlers hold a strong reference to a destroyed <code>ReactApplicationContext</code> or <code>Activity</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q51</span> How do you read a native crash log from Sentry? What are dSYM and ProGuard mapping files?</div>
      <div class="qa-a">Production crash logs show hex memory addresses (iOS) or obfuscated single-letter classes (Android).
        <ul>
          <li><strong>dSYM (Debug Symbols):</strong> An archive generated during iOS compilation that maps machine instructions back to original Swift/C++ source files and line numbers.</li>
          <li><strong>ProGuard / R8 Mapping File:</strong> The <code>mapping.txt</code> file generated during Android release compilation that de-obfuscates minified stack traces back to readable Kotlin/Java code.</li>
          <li><strong>Hermes Source Map:</strong> Maps Hermes bytecode instruction offsets back to your original TypeScript source code lines.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q52</span> Explain the Bridge Deadlock scenario.</div>
      <div class="qa-a">A Bridge Deadlock occurs in the legacy architecture when JavaScript invokes a synchronous native method using <code>isBlockingSynchronousMethod = true</code>. The JS thread pauses and synchronously waits for the native module to return. If the native method dispatches work to the main UI thread or attempts to acquire a lock held by a thread waiting on the JS bridge, both threads wait on each other forever, freezing the app completely. The New Architecture eliminates this risk by replacing the message bridge with direct JSI Host Object calls.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q53</span> How do you profile and diagnose slow app startup time?</div>
      <div class="qa-a">Split startup time into three distinct phases:
        <ul>
          <li><strong>Native OS Init:</strong> Use Android Systrace / Perfetto or Xcode Time Profiler. Defer non-critical third-party SDK initializations (e.g. analytics, attribution, marketing tools) from <code>Application.onCreate</code> / <code>didFinishLaunchingWithOptions</code> to background queues or post-mount phases.</li>
          <li><strong>JS Bundle Parsing:</strong> Ensure Hermes AOT bytecode compilation is active. Enable <code>inlineRequires: true</code> in <code>metro.config.js</code> so imported modules are only parsed when first called.</li>
          <li><strong>Initial React Mount:</strong> Render a lightweight splash or skeleton screen before mounting heavy child navigation stacks.</li>
        </ul>
      </div>
    </div>
  </div>
`;
