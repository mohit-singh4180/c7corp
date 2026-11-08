module.exports = `
  <h2 id="sec-1">1. Architecture &amp; The New Architecture (Bridge vs. Fabric &amp; TurboModules)</h2>

  <div class="code-container">
    <h3>Legacy Architecture vs. New Architecture Topology</h3>
    <div class="diagram-box">====================================================================================================
LEGACY BRIDGE ARCHITECTURE (Asynchronous JSON Serialization)
====================================================================================================
+-----------------------+     JSON Over Async Queue     +------------------------------------------+
|       JS Thread       | ============================> |             Native UI Thread             |
|   (V8 / JSC Engine)   |   Batched, Stringified Data   |     (UIKit / Android Views / Main)       |
+-----------------------+ <============================ +------------------------------------------+
           |                                                                 |
           |                  +-----------------------+                      |
           +----------------> |  Shadow/Layout Thread | <--------------------+
                              |  (Yoga Layout Engine) |
                              +-----------------------+
Bottlenecks: (1) Serialized JSON overhead across bridge. (2) Asynchronous lag on rapid scroll/gestures.
             (3) Eager initialization: all native modules load into memory at boot time.

====================================================================================================
NEW ARCHITECTURE (JSI + FABRIC + TURBOMODULES + CODEGEN)
====================================================================================================
+--------------------------------------------------------------------------------------------------+
| C++ Host Core (Direct Memory Access via Pointers)                                                |
|  +--------------------+       Direct Host Object Access       +-------------------------------+  |
|  | JavaScript Engine  | <===================================> |       Native Host Code        |  |
|  |  (Hermes Runtime)  |     jsi::HostObject Reference Pointers|      (iOS Swift / Kotlin)     |  |
|  +--------------------+                                       +-------------------------------+  |
|            |                                                                  |                  |
|            v                                                                  v                  |
|  +---------------------------------------------------------------------------------------------+ |
|  | Fabric Renderer (C++ Component Descriptor Tree)                                             | |
|  | * Executes Yoga directly in C++  * Synchronous UI commits  * React 18 Concurrent Rendering  | |
|  +---------------------------------------------------------------------------------------------+ |
|            ^                                                                                     |
|  +---------------------------------------------------------------------------------------------+ |
|  | TurboModules (JSI-Bound Native Modules on Demand)                                           | |
|  | * Lazy initialization at first call  * Direct synchronous and asynchronous method dispatch | |
|  +---------------------------------------------------------------------------------------------+ |
+--------------------------------------------------------------------------------------------------+
                                                 ^
                                    +--------------------------+
                                    | Codegen (TS Specs -> C++)|
                                    +--------------------------+</div>
  </div>

  <h3>Core Architectural Mechanics</h3>
  <ul>
    <li><strong>JSI (JavaScript Interface):</strong> A lightweight C++ API that embeds the JavaScript engine (Hermes). It allows JavaScript code to hold direct pointer references to C++ host objects (and vice-versa). This eliminates stringification, parsing, and serialization overhead, enabling true <strong>synchronous zero-copy method calls</strong>.</li>
    <li><strong>Fabric Renderer:</strong> The rewritten rendering pipeline. Instead of passing UI mutation commands as batched JSON to the legacy <code>UIManager</code>, Fabric creates an immutable C++ shadow tree directly. Fabric implements 3 phases:
      <ul>
        <li><em>Render:</em> React executes in JS and creates an element tree; Fabric clones corresponding C++ Shadow Nodes.</li>
        <li><em>Commit:</em> Yoga calculates cross-platform Flexbox layouts directly in C++ and promotes the shadow tree to the "next" tree.</li>
        <li><em>Mount:</em> The host platform translates C++ Shadow Nodes into concrete native platform views (<code>UIView</code> on iOS, <code>android.view.View</code> on Android).</li>
      </ul>
    </li>
    <li><strong>TurboModules:</strong> Native modules bound via JSI. Unlike legacy modules that are eagerly initialized during application launch, TurboModules are loaded <strong>lazily on demand</strong> when first accessed by JavaScript, drastically reducing app startup memory and Time-to-Interactive (TTI).</li>
    <li><strong>Codegen:</strong> A compile-time code generator. By analyzing strongly typed TypeScript or Flow specification files, Codegen generates C++ glue code, JSI bindings, and native protocol interfaces, guaranteeing compile-time type safety across the JS-to-native boundary.</li>
    <li><strong>Hermes Engine:</strong> Meta's JavaScript engine optimized for React Native. Compiles JS source code into compact Ahead-of-Time (AOT) bytecode (<code>.hbc</code>) at build time. Skips runtime parsing and compilation warmup on mobile devices, dramatically improving TTI and reducing heap allocation.</li>
    <li><strong>Yoga Engine:</strong> A cross-platform C++ layout engine implementing W3C Flexbox. It receives React layout declarations and calculates exact pixel coordinates (x, y, width, height) executed natively across iOS and Android.</li>
  </ul>

  <div class="code-container">
    <span class="code-label">C++ JSI Direct Host Object Binding (MathHostObject.cpp)</span>
    <pre><code>#include &lt;jsi/jsi.h&gt;

using namespace facebook;

class MathHostObject : public jsi::HostObject {
public:
  jsi::Value get(jsi::Runtime&amp; runtime, const jsi::PropNameID&amp; name) override {
    auto propName = name.utf8(runtime);
    
    // Direct zero-copy synchronous C++ function exposure
    if (propName == "fastMultiply") {
      return jsi::Function::createFromHostFunction(
        runtime,
        name,
        2, // argument count
        [](jsi::Runtime&amp; rt, const jsi::Value&amp; thisVal, const jsi::Value* args, size_t count) -&gt; jsi::Value {
          if (count &lt; 2 || !args[0].isNumber() || !args[1].isNumber()) {
            throw jsi::JSError(rt, "fastMultiply requires two numeric parameters");
          }
          double a = args[0].asNumber();
          double b = args[1].asNumber();
          return jsi::Value(a * b); // Synchronous direct return — zero serialization
        }
      );
    }
    return jsi::Value::undefined();
  }
};</code></pre>
  </div>

  <div class="qa-section">
    <h3>Quick Review — Architecture &amp; The New Architecture (Q1 – Q8)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q1</span> What is the key difference between the Old Bridge architecture and the New Architecture?</div>
      <div class="qa-a">The legacy Bridge serialized all JavaScript-to-Native communication into stringified JSON messages sent asynchronously over a single message queue channel. This introduced heavy serialization latency, queuing congestion, and dropped frames during high-frequency gestures or list scrolling. The New Architecture completely removes the bridge: it uses <strong>JSI</strong> for direct zero-copy memory calls between JS and C++, <strong>Fabric</strong> for synchronous concurrent UI rendering, and <strong>TurboModules</strong> for lazy native module initialization.
        <pre><code>// LEGACY: Asynchronous JSON serialization over bridge
NativeModules.DeviceSecurity.getToken((error, token) => { /* async callback */ });

// NEW ARCHITECTURE: Direct synchronous JSI HostObject reference
const token = global.__turboModuleProxy('DeviceSecurity').getToken(); // Zero-copy C++ call</code></pre>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q2</span> What is JSI and how does it allow JS to hold references to C++ host objects?</div>
      <div class="qa-a">JSI (JavaScript Interface) is a general-purpose C++ abstraction layer embedding the JavaScript virtual machine (Hermes, V8, or JSC). Through JSI, the JS engine can bind C++ instances of <code>jsi::HostObject</code> directly onto JavaScript objects in the heap. When JS accesses a property or method on a host object, the C++ runtime handles the lookup synchronously via memory pointers without stringifying data or traversing OS message queues.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q3</span> What is the Fabric Renderer and how does it differ from the legacy UIManager?</div>
      <div class="qa-a">Legacy UIManager executed in the native layer (Java/Obj-C) and received batched UI mutations serialized across the bridge, resulting in UI desynchronization on fast scrolls (white blank spots). Fabric executes directly in C++ and maintains an immutable shadow node tree. It supports <strong>React 18 Concurrent Features</strong> (e.g., <code>startTransition</code>, Suspense), allowing user interactions (typing, tapping) to interrupt lower-priority background UI rendering, eliminating interface freeze.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q4</span> What are TurboModules and how do they improve startup time?</div>
      <div class="qa-a">Legacy Native Modules were loaded and initialized <strong>eagerly at app startup</strong>: iOS instantiated every single <code>RCTBridgeModule</code> in the app, and Android registered every <code>ReactPackage</code> on the UI thread before rendering the initial frame. <strong>TurboModules</strong> are loaded <strong>lazily on demand</strong> via JSI proxy: when JavaScript code first calls <code>TurboModuleRegistry.get('Module')</code>, only then is the native module instantiated in memory, significantly reducing cold-start time and baseline memory consumption.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q5</span> What is Codegen and why is it required in the New Architecture?</div>
      <div class="qa-a">Codegen is a build-time tool that scans TypeScript or Flow interface files (e.g., <code>NativeCameraSpec.ts</code>) and automatically generates typed C++ header files, boilerplate structs, and JSI wrappers. Codegen guarantees strict contract synchronization between JavaScript and Native: if a native method expects a boolean and JS sends an object, it fails at compile time rather than crashing at runtime in production.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q6</span> How does Hermes optimise Time-to-Interactive (TTI)?</div>
      <div class="qa-a">Traditional mobile JS engines (V8, JSC) read raw JavaScript text files over the filesystem, parse the AST, and warm up JIT (Just-In-Time) compilers during app launch. Hermes compiles JavaScript into optimized bytecode (<code>.hbc</code>) Ahead-of-Time (AOT) at build time. On device launch:
        <ul>
          <li>Hermes maps the bytecode file directly into memory with zero parsing overhead.</li>
          <li>It executes bytecode directly via a compact interpreter without JIT compilation pauses.</li>
          <li>It implements a compact, generational garbage collector tailored for mobile memory constraints.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q7</span> When would you disable Hermes and how?</div>
      <div class="qa-a">Hermes should only be disabled if an essential legacy native library requires specific ECMAScript features not fully supported by Hermes (such as <code>with</code> statements or certain complex <code>Intl</code> polyfills), or if debugging an engine-specific bytecode compilation bug.
        <ul>
          <li><strong>Expo:</strong> In <code>app.json</code> set <code>"jsEngine": "jsc"</code> instead of <code>"hermes"</code>.</li>
          <li><strong>Bare React Native:</strong> In <code>android/app/build.gradle</code> set <code>project.ext.react = [ enableHermes: false ]</code>; in <code>ios/Podfile</code> set <code>:hermes_enabled => false</code>.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q8</span> What is Yoga and what does it output?</div>
      <div class="qa-a">Yoga is Meta's high-performance C++ layout engine implementing W3C Flexbox specifications. React Native components declare declarative styles (<code>flexDirection</code>, <code>justifyContent</code>, <code>padding</code>). Yoga computes these constraints and outputs precise concrete geometry coordinates: <code>left</code>, <code>top</code>, <code>width</code>, and <code>height</code> in density-independent pixels, which the host OS translates into native <code>CGRect</code> (iOS) and Android layout bounds.</div>
    </div>
  </div>
`;
