module.exports = `
  <h2 id="sec-11">11. Navigation Systems, Testing Strategies &amp; Engineering Utilities</h2>

  <h3>React Navigation Patterns &amp; Parameter Passing</h3>
  <p>React Navigation (using <code>@react-navigation/native-stack</code>) leverages native platform primitives (<code>UINavigationController</code> on iOS and <code>Fragment</code> / <code>CoordinatorLayout</code> on Android) via <code>react-native-screens</code> for optimal performance. Route parameters must always be strongly typed using TypeScript:</p>

  <div class="code-container">
    <span class="code-label">Type-Safe Navigation Setup (NavigationParams.ts)</span>
    <pre><code>import { NativeStackScreenProps } from '@react-navigation/native-stack';

// 1. Centralized Route Parameter List
export type RootStackParamList = {
  HomeFeed: undefined;
  ProductDetail: { productId: string; referrer?: string };
  Checkout: { cartId: string; totalAmount: number };
  UserProfile: { userId: string };
};

// 2. Strongly typed screen props helper
export type ProductDetailScreenProps = NativeStackScreenProps&lt;
  RootStackParamList,
  'ProductDetail'
&gt;;

// 3. Screen implementation with compile-time type safety
export const ProductDetailScreen: React.FC&lt;ProductDetailScreenProps&gt; = ({ route, navigation }) => {
  const { productId, referrer } = route.params;

  return (
    &lt;View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}&gt;
      &lt;Text&gt;Product ID: {productId}&lt;/Text&gt;
      &lt;Button
        title="Proceed to Checkout"
        onPress={() => navigation.navigate('Checkout', { cartId: 'c_99', totalAmount: 49.99 })}
      /&gt;
    &lt;/View&gt;
  );
};</code></pre>
  </div>

  <h3>React Navigation vs. React Native Navigation (Wix) — Trade-off Analysis</h3>
  <table>
    <thead>
      <tr>
        <th>Architectural Factor</th>
        <th>React Navigation (Community Standard)</th>
        <th>React Native Navigation (Wix RNN)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Architecture</strong></td>
        <td>Pure JavaScript navigation state running in a single native container, backed by <code>react-native-screens</code>.</td>
        <td>Each screen is instantiated as a <strong>completely independent native UIViewController (iOS) or Activity (Android)</strong>.</td>
      </tr>
      <tr>
        <td><strong>Transition Performance</strong></td>
        <td>Near 60/120 FPS when using <code>@react-navigation/native-stack</code>. Minimal bridge crossing.</td>
        <td><strong>100% native 120 FPS transitions</strong>, completely immune to JavaScript thread congestion or freezes.</td>
      </tr>
      <tr>
        <td><strong>Setup &amp; Maintenance</strong></td>
        <td>Simple npm install with minimal native modifications. Compatible with Expo Managed workflow.</td>
        <td>Invasive native setup modifying <code>AppDelegate</code>, <code>MainActivity</code>, and Gradle. Incompatible with standard Expo Go.</td>
      </tr>
      <tr>
        <td><strong>State Sharing</strong></td>
        <td>Seamless. All screens live in the same React root tree and easily share Redux/Zustand/Context state.</td>
        <td>Complex. Because each screen is an isolated React root, sharing React Context requires extra native synchronization bridges.</td>
      </tr>
    </tbody>
  </table>

  <h3>Conditional Onboarding Flow Architecture</h3>
  <p>Enterprise apps require routing users conditionally based on two variables: (1) First launch vs. returning user (onboarding carousel), and (2) Authenticated vs. guest user. Evaluate these flags before rendering screens to avoid screen transition flickering:</p>

  <div class="code-container">
    <span class="code-label">Conditional Auth &amp; Onboarding Gate (RootNavigator.tsx)</span>
    <pre><code>import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export const RootNavigator = ({
  isLoading,
  hasCompletedOnboarding,
  isAuthenticated,
}: {
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
}) => {
  if (isLoading) {
    return (
      &lt;View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}&gt;
        &lt;ActivityIndicator size="large" color="#2563eb" /&gt;
      &lt;/View&gt;
    );
  }

  return (
    &lt;Stack.Navigator screenOptions={{ headerShown: false }}&gt;
      {!hasCompletedOnboarding ? (
        // 1. Onboarding Stack (Shown only on first launch)
        &lt;Stack.Screen name="Onboarding" component={OnboardingScreen} /&gt;
      ) : !isAuthenticated ? (
        // 2. Auth Stack (Login / Signup)
        &lt;Stack.Group&gt;
          &lt;Stack.Screen name="Login" component={LoginScreen} /&gt;
          &lt;Stack.Screen name="Register" component={RegisterScreen} /&gt;
        &lt;/Stack.Group&gt;
      ) : (
        // 3. Main Authenticated Application Stack
        &lt;Stack.Group&gt;
          &lt;Stack.Screen name="MainTabs" component={MainTabNavigator} /&gt;
          &lt;Stack.Screen name="Settings" component={SettingsScreen} /&gt;
        &lt;/Stack.Group&gt;
      )}
    &lt;/Stack.Navigator&gt;
  );
};</code></pre>
  </div>

  <h3>Comprehensive Testing: Jest, Detox, and Mocks</h3>
  <ul>
    <li><strong>Unit &amp; Component Testing (Jest + React Native Testing Library):</strong> Renders components in a mocked virtual DOM environment. Mocks native modules (such as <code>NativeEventEmitter</code>, <code>Platform</code>, and <code>AsyncStorage</code>) using <code>jest.mock()</code>. Tests user interactions via <code>fireEvent.press()</code> and asserts screen outputs.</li>
    <li><strong>End-to-End Testing (Detox):</strong> Executes tests on real iOS simulators and Android emulators. Detox synchronizes directly with the app's native run loops (monitoring the JS event queue, network requests, and active animations). Tests only proceed when the app is completely idle, eliminating flaky <code>sleep()</code> statements.</li>
  </ul>

  <h3>Developer Experience: Fast Refresh vs. Hot Reloading</h3>
  <ul>
    <li><strong>Hot Reloading (Legacy):</strong> Attempted to inject modified JavaScript modules into the running app without reloading. Highly prone to broken closures, duplicate event listeners, and corrupt state.</li>
    <li><strong>Fast Refresh (Modern):</strong> Combines hot reloading with full React state preservation. If you edit a React component, Fast Refresh updates only the visual view while preserving local component state. If you edit a non-React file or syntax error occurs, it performs a clean reload automatically.</li>
  </ul>

  <h3>Debounce &amp; Throttle Implementations</h3>
  <div class="code-container">
    <span class="code-label">Mobile Rate Limiters (RateLimiters.ts)</span>
    <pre><code>// Debounce: Delays execution until waitMs of inactivity (e.g., search text input)
export function debounce&lt;T extends (...args: any[]) =&gt; void&gt;(
  fn: T,
  waitMs: number
): (...args: Parameters&lt;T&gt;) => void {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters&lt;T&gt;) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), waitMs);
  };
}

// Throttle: Enforces maximum execution rate of once per limitMs (e.g., high-rate scroll events)
export function throttle&lt;T extends (...args: any[]) =&gt; void&gt;(
  fn: T,
  limitMs: number
): (...args: Parameters&lt;T&gt;) => void {
  let inThrottle = false;
  return (...args: Parameters&lt;T&gt;) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limitMs);
    }
  };
}</code></pre>
  </div>

  <h3>Integrating Web-First SDKs in React Native</h3>
  <p>When an essential third-party vendor provides only a browser JavaScript SDK without native mobile support, do not attempt to polyfill browser globals directly in the main JS thread. Instead, render an offscreen or embedded <strong><code>&lt;WebView&gt;</code></strong> from <code>react-native-webview</code>. Execute the web SDK in the WebView's secure browser sandbox, and bridge communication two-way via <code>window.ReactNativeWebView.postMessage()</code> and <code>onMessage</code>.</p>

  <h3>Real-Time Updates &amp; WebSockets</h3>
  <p>React Native includes native WebSocket support conforming to the W3C WebSocket standard. When using <code>socket.io-client</code>:</p>
  <ul>
    <li>Specify <code>transports: ['websocket']</code> to skip browser HTTP long-polling negotiation.</li>
    <li>Listen to <code>AppState</code> changes: automatically disconnect the socket when entering <code>background</code> to prevent battery drain, and reconnect when entering <code>active</code>.</li>
  </ul>

  <h3>Accessibility (a11y) in React Native</h3>
  <p>To support screen readers (iOS VoiceOver and Android TalkBack):</p>
  <ul>
    <li>Mark interactive elements with <code>accessible={true}</code>.</li>
    <li>Provide clear descriptive voice text: <code>accessibilityLabel="Close modal dialog"</code>.</li>
    <li>Declare semantic element roles: <code>accessibilityRole="button"</code>, <code>"header"</code>, <code>"link"</code>, or <code>"image"</code>.</li>
    <li>Indicate dynamic state: <code>accessibilityState={{ disabled: true, checked: false }}</code>.</li>
  </ul>

  <div class="qa-section">
    <h3>Quick Review — Navigation, Testing &amp; Utilities (Q64 – Q69)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q64</span> Compare React Navigation vs React Native Navigation (Wix) for an enterprise app.</div>
      <div class="qa-a">React Navigation runs its navigation state inside JavaScript and renders screens inside a single native container using <code>react-native-screens</code>. It is the overwhelming community standard, easily shares React Context/Zustand state across screens, and works seamlessly with Expo. Wix React Native Navigation (RNN) creates a completely separate native <code>UIViewController</code> or <code>Activity</code> for every screen, delivering flawless 120 FPS transitions even under JS load, but requires complex native setup and makes global state sharing across screen roots significantly more complex.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q65</span> How does conditional onboarding navigation work (first launch vs. returning user)?</div>
      <div class="qa-a">On app cold boot, read a persistent flag (e.g. <code>hasCompletedOnboarding</code>) from MMKV or AsyncStorage alongside the authentication token. While reading, render a splash or loading indicator. In your root navigator, conditionally declare screens: if <code>!hasCompletedOnboarding</code>, mount the <code>&lt;OnboardingStack&gt;</code>; else if <code>!isAuthenticated</code>, mount the <code>&lt;AuthStack&gt;</code>; otherwise mount the <code>&lt;MainAppStack&gt;</code>. React Navigation automatically animates between stacks when state transitions occur.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q66</span> How do you write a Jest unit test for a React Native component?</div>
      <div class="qa-a">Use <code>@testing-library/react-native</code>. Mock native modules in a <code>jest.setup.js</code> file (e.g., mocking <code>react-native/Libraries/EventEmitter/NativeEventEmitter</code> or <code>react-native-keychain</code>). In the test file:
        <pre><code>import { render, fireEvent } from '@testing-library/react-native';
import { ControlledField } from '../ControlledField';

test('renders error message when error prop is provided', () => {
  const { getByText } = render(
    &lt;ControlledField label="Email" value="" onChangeText={() =&gt; {}} error="Invalid email address" /&gt;
  );
  expect(getByText('Invalid email address')).toBeTruthy();
});</code></pre>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q67</span> How does Detox end-to-end testing work in React Native?</div>
      <div class="qa-a">Detox compiles and installs the true native binary onto an iOS simulator or Android emulator. It runs test scripts in Node.js while an embedded native Detox framework monitors the app's internal threads: it tracks pending timers, active network calls, running layout calculations, and animations. Detox automatically waits until all threads are idle before executing assertions, eliminating race conditions and flaky UI test failures. Select elements using <code>testID</code> props: <code>await element(by.id('submit_button')).tap();</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q68</span> How do you implement real-time features (WebSocket / socket.io) in React Native?</div>
      <div class="qa-a">Instantiate <code>io('https://api.company.com', { transports: ['websocket'] })</code> inside a dedicated service or Zustand store. Subscribe to incoming events in <code>useEffect</code>. To prevent battery drain and dropped socket leaks, subscribe to <code>AppState</code>: when the app transitions to <code>background</code>, cleanly call <code>socket.disconnect()</code>; when returning to <code>active</code>, invoke <code>socket.connect()</code> and resubscribe to active room channels.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q69</span> How do you implement accessibility (a11y) in React Native and test it?</div>
      <div class="qa-a">Set <code>accessible={true}</code> on touchable cards, provide descriptive <code>accessibilityLabel</code> strings, and assign semantic roles using <code>accessibilityRole="button"</code> or <code>"header"</code>. Test on real physical hardware: enable <strong>VoiceOver</strong> on iOS (Settings &gt; Accessibility &gt; VoiceOver) or <strong>TalkBack</strong> on Android, and navigate through the app using swipe and double-tap gestures to verify every visual element has a clear, audible screen reader description.</div>
    </div>
  </div>
`;
