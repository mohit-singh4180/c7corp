module.exports = `
  <h2 id="sec-4">4. Native Bridge, JSI &amp; Custom Native Code Integration</h2>

  <h3>iOS: Swift Native Module (DeviceSecurity.swift)</h3>
  <p>To integrate native iOS APIs, write a Swift class annotated with <code>@objc</code> and export its interface to React Native via an Objective-C bridging macro:</p>

  <div class="code-container">
    <span class="code-label">Swift Native Module (DeviceSecurity.swift)</span>
    <pre><code>import Foundation
import LocalAuthentication

@objc(DeviceSecurity)
class DeviceSecurity: NSObject {

  @objc(isBiometricsAvailable:rejecter:)
  func isBiometricsAvailable(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let context = LAContext()
    var error: NSError?

    if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &amp;error) {
      resolve(true)
    } else {
      resolve(false)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false // Keeps module initialization off the main UI thread
  }
}</code></pre>
  </div>

  <div class="code-container">
    <span class="code-label">Objective-C Bridge Interface (DeviceSecurityBridge.m)</span>
    <pre><code>#import &lt;React/RCTBridgeModule.h&gt;

@interface RCT_EXTERN_MODULE(DeviceSecurity, NSObject)

RCT_EXTERN_METHOD(isBiometricsAvailable:(RCTPromiseResolveBlock)resolve
                               rejecter:(RCTPromiseRejectBlock)reject)

@end</code></pre>
  </div>

  <h3>Android: Kotlin Native Module (DeviceSecurityModule.kt)</h3>
  <div class="code-container">
    <span class="code-label">Kotlin Native Module (DeviceSecurityModule.kt)</span>
    <pre><code>package com.myapp.security

import androidx.biometric.BiometricManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class DeviceSecurityModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "DeviceSecurity"

  @ReactMethod
  fun isBiometricsAvailable(promise: Promise) {
    try {
      val biometricManager = BiometricManager.from(reactApplicationContext)
      val canAuthenticate = biometricManager.canAuthenticate(
        BiometricManager.Authenticators.BIOMETRIC_STRONG
      )
      promise.resolve(canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS)
    } catch (e: Exception) {
      promise.reject("ERR_BIOMETRICS", e.localizedMessage, e)
    }
  }
}</code></pre>
  </div>

  <h3>Synchronous Methods: Legacy vs. JSI</h3>
  <ul>
    <li><strong>Legacy Synchronous Methods:</strong> Configured using <code>@ReactMethod(isBlockingSynchronousMethod = true)</code>. While it returns a value directly to JS, it <strong>completely freezes the JavaScript thread</strong> while waiting for the native OS thread to return. If the native method waits on a background lock or touches the main UI thread, it causes an unrecoverable <strong>Bridge Deadlock</strong>.</li>
    <li><strong>JSI Synchronous Calls:</strong> In the New Architecture, native C++ methods are exposed directly as Host Objects. The JavaScript engine invokes the C++ pointer in the exact same memory space with zero message queue serialization and zero thread blocking risk.</li>
  </ul>

  <h3>Custom ViewManager Architecture</h3>
  <p>To expose custom native views (such as a hardware camera preview, a high-performance video player, or a native chart view) into the React Native component tree, subclass <code>SimpleViewManager&lt;T&gt;</code> (Android) or <code>RCTViewManager</code> (iOS):</p>
  <ul>
    <li>Annotate property setters with <code>@ReactProp(name = "propName")</code> to receive declarative updates from React.</li>
    <li>Dispatch native touch and lifecycle events to JavaScript via <code>RCTEventEmitter</code>.</li>
  </ul>

  <h3>Native-to-JS Events &amp; Linking Evolution</h3>
  <ul>
    <li><strong>Event Emission:</strong> Native code creates events using <code>RCTDeviceEventEmitter</code> (Android) or subclasses <code>RCTEventEmitter</code> (iOS). JavaScript subscribes using <code>new NativeEventEmitter(NativeModules.ModuleName)</code> and removes listeners in <code>useEffect</code> cleanups.</li>
    <li><strong>Native Linking Evolution:</strong>
      <ul>
        <li><em>Manual Linking (Pre-0.60):</em> Developers manually edited <code>Podfile</code>, <code>settings.gradle</code>, and <code>MainApplication.java</code>. Highly error-prone during upgrades.</li>
        <li><em><code>react-native link</code>:</em> CLI script attempting regex-based file modifications; frequently corrupted project files.</li>
        <li><em>Autolinking (0.60+):</em> CocoaPods and Gradle automatically discover native dependencies by parsing installed npm packages containing <code>.podspec</code> and <code>build.gradle</code> files at build time.</li>
        <li><em>Expo Config Plugins:</em> Modern standard. Programmatically modifies native <code>AndroidManifest.xml</code>, <code>Info.plist</code>, and build settings at prebuild time without committing transient native folders to version control.</li>
      </ul>
    </li>
  </ul>

  <h3>Platform Module &amp; Platform-Specific Files</h3>
  <ul>
    <li><strong><code>Platform.OS</code>:</strong> Returns <code>'ios'</code>, <code>'android'</code>, <code>'windows'</code>, <code>'macos'</code>, or <code>'web'</code>.</li>
    <li><strong><code>Platform.select()</code>:</strong> Chooses the matching platform object: <code>Platform.select({ ios: 20, android: 16, default: 0 })</code>.</li>
    <li><strong>Platform-Specific File Extensions:</strong> When Metro bundles an import (e.g. <code>import Header from './Header'</code>), it checks for <code>Header.ios.tsx</code> or <code>Header.android.tsx</code> first before falling back to <code>Header.tsx</code>. This is the cleanest pattern for completely separate native implementations.</li>
  </ul>

  <div class="qa-section">
    <h3>Quick Review — Native Bridge &amp; Custom Native Code (Q26 – Q33)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q26</span> How do you expose a custom Swift (iOS) and Kotlin (Android) native module to JavaScript?</div>
      <div class="qa-a">
        <ul>
          <li><strong>iOS (Swift):</strong> Create a class extending <code>NSObject</code> annotated with <code>@objc(ModuleName)</code>. Annotate exported methods with <code>@objc</code> taking <code>RCTPromiseResolveBlock</code> and <code>RCTPromiseRejectBlock</code>. Create a companion Objective-C file exporting the module via <code>RCT_EXTERN_MODULE</code> and <code>RCT_EXTERN_METHOD</code>.</li>
          <li><strong>Android (Kotlin):</strong> Create a class subclassing <code>ReactContextBaseJavaModule</code>. Override <code>getName()</code>. Annotate exported methods with <code>@ReactMethod</code> accepting a <code>com.facebook.react.bridge.Promise</code>. Register the module inside a <code>ReactPackage</code>.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q27</span> What is the difference between legacy synchronous native methods and JSI synchronous calls?</div>
      <div class="qa-a">Legacy synchronous methods use <code>@ReactMethod(isBlockingSynchronousMethod = true)</code>. They halt the entire JavaScript thread while waiting for the native thread to process and return data over the bridge queue, creating high risk of frame drops and deadlocks. JSI synchronous calls execute directly in the same memory context via C++ Host Objects: the JS runtime evaluates the C++ method pointer instantly with zero message queuing.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q28</span> How do you expose a native Android View or iOS UIView into the React Native component tree?</div>
      <div class="qa-a">On Android, extend <code>SimpleViewManager&lt;T&gt;</code>, override <code>createViewInstance()</code>, and bind React props to native methods using <code>@ReactProp(name = "propName")</code>. On iOS, subclass <code>RCTViewManager</code>, override <code>view()</code> returning the <code>UIView</code>, and expose props via <code>RCT_EXPORT_VIEW_PROPERTY</code>. Wrap the resulting native component in JavaScript using <code>requireNativeComponent('ViewName')</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q29</span> How does native-to-JS event emission work?</div>
      <div class="qa-a">Native code sends events to JavaScript without waiting for a request. On iOS, the module subclasses <code>RCTEventEmitter</code> and calls <code>self.sendEvent(withName: "onEvent", body: payload)</code>. On Android, the module grabs the <code>RCTDeviceEventEmitter</code> from <code>reactContext.getJSModule()</code> and emits the payload. In JavaScript, create a <code>new NativeEventEmitter(NativeModules.ModuleName)</code> and register listeners via <code>.addListener()</code>, ensuring cleanup in <code>useEffect</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q30</span> Explain the evolution of native dependency linking in React Native.</div>
      <div class="qa-a">Native linking evolved through 4 distinct eras:
        <ol>
          <li><strong>Manual Linking:</strong> Dragging Xcode frameworks and editing Gradle scripts manually. Highly fragile.</li>
          <li><strong><code>react-native link</code>:</strong> Heuristic text-search scripts that attempted automated file insertion, frequently duplicating entries.</li>
          <li><strong>Autolinking (RN 0.60+):</strong> Build tools query <code>react-native config</code> at compile time, automatically discovering podspecs and gradle dependencies.</li>
          <li><strong>Expo Config Plugins:</strong> Modern standard. Compiles native configurations deterministically during prebuild without checking native iOS/Android code into git.</li>
        </ol>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q31</span> How do you handle a third-party library that only supports one platform?</div>
      <div class="qa-a">Isolate the library behind platform-specific files: create <code>Feature.ios.tsx</code> (importing and executing the iOS-only library) and <code>Feature.android.tsx</code> (providing an Android alternative or graceful fallback UI). Alternatively, use <code>Platform.select()</code> or dynamic conditional require guarded by <code>Platform.OS === 'ios'</code> to prevent the unsupported platform from attempting to resolve missing native symbols at runtime.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q32</span> What does the Platform module provide and what are platform-specific files?</div>
      <div class="qa-a">The <code>Platform</code> module provides runtime platform detection (<code>Platform.OS</code>), OS version checks (<code>Platform.Version</code>), and declarative branch selection (<code>Platform.select</code>). Platform-specific files (<code>*.ios.tsx</code>, <code>*.android.tsx</code>, <code>*.native.tsx</code>) are resolved at <strong>bundle time</strong> by Metro. Code written for iOS is completely omitted from the Android JS bundle, minimizing bundle size and preventing cross-platform crashes.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q33</span> How would you integrate a native-only third-party SDK that provides UI?</div>
      <div class="qa-a">Wrap the native SDK's visual views inside a custom <code>RCTViewManager</code> (iOS) and <code>SimpleViewManager</code> (Android). Pass configuration parameters via <code>@ReactProp</code>, handle native delegates/callbacks by firing events through <code>RCTEventEmitter</code>, and wrap any non-UI SDK methods (such as initialization and authentication) in a companion Native Module. In React Native, expose a unified, type-safe custom JSX component.</div>
    </div>
  </div>
`;
