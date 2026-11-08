module.exports = `
  <h2 id="sec-10">10. Core Fundamentals, Layout Systems &amp; Essential UI Primitives</h2>

  <h3>Functional vs. Class Components &amp; Controlled Inputs</h3>
  <p>Modern React Native development is strictly functional, utilizing React Hooks (<code>useState</code>, <code>useCallback</code>, <code>useMemo</code>, <code>useRef</code>). Functional components have a lower memory footprint than class components, eliminate binding boilerplate, and interoperate seamlessly with modern libraries like Reanimated v3 and Zustand.</p>

  <div class="code-container">
    <span class="code-label">Production Controlled Field Implementation (ControlledField.tsx)</span>
    <pre><code>import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface ControlledFieldProps extends TextInputProps {
  label: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const ControlledField: React.FC&lt;ControlledFieldProps&gt; = ({
  label, error, value, onChangeText, ...rest
}) => (
  &lt;View style={styles.container}&gt;
    &lt;Text style={styles.label}&gt;{label}&lt;/Text&gt;
    &lt;TextInput
      style={[styles.input, error ? styles.inputError : null]}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#94a3b8"
      accessible={true}
      accessibilityLabel={label}
      accessibilityHint={error ? \`Error: \${error}\` : undefined}
      {...rest}
    /&gt;
    {error ? &lt;Text style={styles.errorText}&gt;{error}&lt;/Text&gt; : null}
  &lt;/View&gt;
);

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 4 },
  input: { height: 42, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingHorizontal: 12, fontSize: 14, color: '#0f172a', backgroundColor: '#fff' },
  inputError: { borderColor: '#ef4444' },
  errorText: { fontSize: 12, color: '#ef4444', marginTop: 4 },
});</code></pre>
  </div>

  <h3>UI Primitives: TouchableOpacity vs. Pressable, Modal, and SafeAreaView</h3>
  <table>
    <thead>
      <tr>
        <th>Primitive</th>
        <th>Native Counterpart</th>
        <th>Key Characteristics &amp; Best Practices</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong><code>&lt;View&gt;</code></strong></td>
        <td><code>UIView</code> (iOS) / <code>ViewGroup</code> (Android)</td>
        <td>Core rectangular layout container. Supports Flexbox, clipping, borders, and touch responders.</td>
      </tr>
      <tr>
        <td><strong><code>&lt;Text&gt;</code></strong></td>
        <td><code>UILabel</code> / <code>UITextView</code> (iOS) / <code>TextView</code> (Android)</td>
        <td><strong>Critical Rule:</strong> In React Native, all raw text strings <em>must</em> be wrapped inside a <code>&lt;Text&gt;</code> component. Placing raw strings directly inside <code>&lt;View&gt;</code> causes an instant fatal red screen crash.</td>
      </tr>
      <tr>
        <td><strong><code>&lt;Pressable&gt;</code></strong></td>
        <td>Native touch target</td>
        <td>Modern replacement for <code>TouchableOpacity</code>. Exposes render functions accepting <code>({ pressed })</code>, customizable <code>hitSlop</code> (expands touch hitbox without changing visual padding), and avoids opacity animation flicker.</td>
      </tr>
      <tr>
        <td><strong><code>&lt;Modal&gt;</code></strong></td>
        <td><code>UIModalPresentation</code> / <code>android.app.Dialog</code></td>
        <td>Renders content in a completely separate native window layer above the current view hierarchy. Always handle Android hardware back press via <code>onRequestClose</code>.</td>
      </tr>
    </tbody>
  </table>

  <h3>Flexbox Layout System, StyleSheet, and Orientation</h3>
  <p>React Native uses Meta's C++ Yoga engine to implement Flexbox layout. It differs from Web CSS Flexbox in several key aspects:</p>
  <ul>
    <li><strong>Default Direction:</strong> <code>flexDirection: 'column'</code> by default (Web defaults to <code>row</code>).</li>
    <li><strong>Display:</strong> Only <code>display: 'flex'</code> and <code>display: 'none'</code> exist. There is no <code>block</code>, <code>inline</code>, <code>grid</code>, or <code>table</code>.</li>
    <li><strong>Units:</strong> All numbers are density-independent pixels (dp/points). There are no <code>px</code>, <code>em</code>, <code>rem</code>, or <code>vh/vw</code> units (percentages are supported as string values: <code>'50%'</code>).</li>
    <li><strong><code>StyleSheet.create</code>:</strong> Validates styles at startup and assigns unique integer IDs in legacy architectures to minimize bridge traffic. In modern engines, it enforces consistent styling structures.</li>
  </ul>

  <div class="code-container">
    <span class="code-label">Adaptive Orientation &amp; Screen Dimensions (ResponsiveLayout.tsx)</span>
    <pre><code>import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

export const ResponsiveLayout = () => {
  // useWindowDimensions automatically updates during device rotation and split-screen
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    &lt;View style={[styles.container, isLandscape ? styles.row : styles.column]}&gt;
      &lt;View style={styles.primary}&gt;
        &lt;Text style={styles.title}&gt;Primary Pane ({Math.round(width)} x {Math.round(height)})&lt;/Text&gt;
      &lt;/View&gt;
      &lt;View style={styles.secondary}&gt;
        &lt;Text style={styles.title}&gt;Secondary Pane&lt;/Text&gt;
      &lt;/View&gt;
    &lt;/View&gt;
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f8fafc' },
  column: { flexDirection: 'column' },
  row: { flexDirection: 'row' },
  primary: { flex: 2, backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 8 },
  secondary: { flex: 1, backgroundColor: '#eff6ff', borderRadius: 8, padding: 14 },
  title: { fontSize: 13, fontWeight: '700', color: '#1e3a8a' },
});</code></pre>
  </div>

  <h3>App Permissions (react-native-permissions)</h3>
  <p>Mobile OS permissions require a two-step implementation: static manifest declarations and runtime user prompts:</p>
  <ul>
    <li><strong>iOS:</strong> Declare mandatory user-facing justification strings in <code>Info.plist</code> (e.g., <code>NSCameraUsageDescription</code>, <code>NSLocationWhenInUseUsageDescription</code>). If these strings are omitted, the app will crash instantly when requesting permission.</li>
    <li><strong>Android:</strong> Declare permissions in <code>AndroidManifest.xml</code> (e.g., <code>ACCESS_FINE_LOCATION</code>, <code>POST_NOTIFICATIONS</code>). Starting in Android 6.0+, and specifically for Android 13+ push notifications (<code>POST_NOTIFICATIONS</code>), permissions must be requested at runtime using <code>PermissionsAndroid</code> or <code>react-native-permissions</code>.</li>
  </ul>

  <div class="qa-section">
    <h3>Quick Review — Core Fundamentals &amp; UI Primitives (Q59 – Q63)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q59</span> What is the difference between View, Text, TouchableOpacity, and Pressable?</div>
      <div class="qa-a">
        <ul>
          <li><strong><code>&lt;View&gt;</code>:</strong> The primary layout container mapping to <code>UIView</code> / <code>ViewGroup</code>.</li>
          <li><strong><code>&lt;Text&gt;</code>:</strong> The typography container mapping to <code>UILabel</code> / <code>TextView</code>. All string text in React Native must reside inside <code>&lt;Text&gt;</code>.</li>
          <li><strong><code>&lt;TouchableOpacity&gt;</code>:</strong> A legacy touch wrapper that animates opacity down to 0.2 when pressed. Prone to visual flickering on rapid taps.</li>
          <li><strong><code>&lt;Pressable&gt;</code>:</strong> The modern recommended interaction primitive. Provides access to raw touch states (<code>pressed</code>), customizable touch bounds (<code>hitSlop</code>), and superior performance with zero forced opacity animations.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q60</span> How does React Native's Flexbox differ from CSS Flexbox?</div>
      <div class="qa-a">React Native uses Yoga C++ layout engine:
        <ul>
          <li>Default <code>flexDirection</code> is <code>column</code> (CSS defaults to <code>row</code>).</li>
          <li>Default <code>alignContent</code> is <code>flex-start</code> (CSS defaults to <code>stretch</code>).</li>
          <li>Default <code>flexShrink</code> is <code>0</code> (CSS defaults to <code>1</code>).</li>
          <li>Only <code>display: 'flex'</code> and <code>display: 'none'</code> are supported (no <code>grid</code>, <code>inline-block</code>, etc.).</li>
          <li>Dimensions are specified as density-independent numbers, not unit strings (no <code>px</code>, <code>em</code>, <code>rem</code>).</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q61</span> When would you use useLayoutEffect vs. useEffect in React Native?</div>
      <div class="qa-a"><code>useEffect</code> runs asynchronously after the screen render has been committed and painted to the screen. <code>useLayoutEffect</code> runs synchronously immediately after React evaluates the component tree but <strong>before the native host mounts views to the screen</strong>. In React Native, use <code>useLayoutEffect</code> only when you need to read layout measurements (e.g. measuring a tool-tip position or adjusting scroll offset) to prevent visible layout jumps or flickering. For all API calls and subscriptions, use <code>useEffect</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q62</span> How do you handle keyboard avoidance for forms in React Native?</div>
      <div class="qa-a">On iOS, the software keyboard floats above the screen, obscuring inputs unless handled. Wrap forms inside:
        <ul>
          <li><strong><code>&lt;KeyboardAvoidingView&gt;</code>:</strong> Pass <code>behavior={Platform.OS === 'ios' ? 'padding' : 'height'}</code> with appropriate <code>keyboardVerticalOffset</code>.</li>
          <li><strong><code>react-native-keyboard-controller</code>:</strong> Modern alternative that provides synchronous, 120 FPS interactive keyboard tracking animated alongside the iOS keyboard transition curve.</li>
          <li>Pair with <code>&lt;ScrollView keyboardShouldPersistTaps="handled"&gt;</code> so tapping outside the input dismisses the keyboard smoothly.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q63</span> What are app permissions and how do you request them at runtime?</div>
      <div class="qa-a">App permissions gate hardware access (Camera, Microphone, Photo Library, Precise Location, Bluetooth). First, declare static purpose strings in <code>Info.plist</code> (iOS) and permissions in <code>AndroidManifest.xml</code> (Android). At runtime, call <code>request(PERMISSIONS.IOS.CAMERA)</code> via <code>react-native-permissions</code>. Handle all permission statuses: <code>UNAVAILABLE</code>, <code>DENIED</code> (can ask again), <code>BLOCKED</code> (user checked "Never ask again"; must prompt user to open device Settings via <code>openSettings()</code>), and <code>GRANTED</code>.</div>
    </div>
  </div>
`;
