module.exports = `
  <h2 id="sec-3">3. Threading, Concurrency &amp; State Management</h2>

  <h3>Thread Topology Across Architectures</h3>
  <ul>
    <li><strong>Main Thread (UI Thread):</strong> Runs the native OS run-loop (iOS <code>UIKit</code> / Android <code>MainLooper</code>). Handles raw touch events, renders native views, and executes platform screen transitions. Must never be blocked by heavy computation.</li>
    <li><strong>JavaScript Thread:</strong> Executes the JavaScript virtual machine (Hermes). Runs React component logic, business rules, API callbacks, and state updates. Must complete its work within 16.6ms per frame to maintain 60 FPS.</li>
    <li><strong>Shadow / Layout Thread (Legacy):</strong> Computes Flexbox layout coordinates via Yoga before dispatching mutations to native views. In the <strong>New Architecture</strong>, Fabric integrates layout calculations directly into C++ without a standalone asynchronous shadow thread.</li>
    <li><strong>Native Background Modules Thread Pool:</strong> Handles asynchronous native API tasks (e.g., File I/O, Geolocation, Camera capture, SQLite queries) off the main thread.</li>
  </ul>

  <h3>Thread Offloading via Custom Native TurboModule (Swift)</h3>
  <p>When an application must perform CPU-intensive tasks (such as SHA-256 batch cryptographic hashing, large file parsing, or image processing), executing them on the JavaScript thread will cause immediate UI freeze. These tasks must be offloaded to native background worker queues:</p>

  <div class="code-container">
    <span class="code-label">Native Thread Offload Worker (Swift)</span>
    <pre><code>import Foundation

@objc(ComputationWorker)
class ComputationWorker: NSObject {

  // Offload heavy computations to a low-priority global background queue
  @objc(processLargePayload:resolver:rejecter:)
  func processLargePayload(
    _ payload: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.global(qos: .userInitiated).async {
      // 1. CPU-intensive background work (does NOT block JS or UI threads)
      guard let data = payload.data(using: .utf8) else {
        rejecter("ERR_PAYLOAD", "Invalid UTF-8 payload", nil)
        return
      }
      
      let processedResult = self.computeCryptographicChecksum(data: data)

      // 2. Resolve promise back to JavaScript runtime
      resolver(processedResult)
    }
  }

  private func computeCryptographicChecksum(data: Data) -> String {
    // Native computation simulation
    return data.base64EncodedString()
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false // Prevents instantiation on the Main UI thread during startup
  }
}</code></pre>
  </div>

  <h3>State Architecture: Redux Toolkit vs. Zustand vs. Context API</h3>
  <table>
    <thead>
      <tr>
        <th>Criteria</th>
        <th>Redux Toolkit (RTK)</th>
        <th>Zustand</th>
        <th>React Context API</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Selector Granularity</strong></td>
        <td>Atomic via <code>useSelector</code>. Re-renders only when the selected value reference changes.</td>
        <td>Atomic via <code>useStore(state => state.property)</code>. Zero unnecessary re-renders.</td>
        <td>Coarse. <strong>All consumers re-render</strong> whenever any property on the context object changes.</td>
      </tr>
      <tr>
        <td><strong>Boilerplate</strong></td>
        <td>Moderate (Slices, reducers, dispatchers, typed store hooks).</td>
        <td>Minimal. Single hook function, zero wrapper providers required.</td>
        <td>Low for setup, high for optimization (requires splitting into multiple contexts).</td>
      </tr>
      <tr>
        <td><strong>Bundle Size</strong></td>
        <td>~11 KB (gzipped)</td>
        <td><strong>~1.2 KB (gzipped)</strong></td>
        <td>0 KB (built directly into React core)</td>
      </tr>
      <tr>
        <td><strong>Asynchronous Flow</strong></td>
        <td>Built-in RTK Query or <code>createAsyncThunk</code>.</td>
        <td>Native async/await directly inside store action methods.</td>
        <td>Manual via <code>useEffect</code> or custom hook dispatchers.</td>
      </tr>
      <tr>
        <td><strong>Enterprise Recommendation</strong></td>
        <td>Complex multi-team apps with massive serialized state trees.</td>
        <td><strong>Recommended for modern React Native apps</strong> (clean, fast, atomic).</td>
        <td>Low-frequency static values only (localization, active theme tokens).</td>
      </tr>
    </tbody>
  </table>

  <h3>Prop Drilling &amp; Context Degradation Mitigation</h3>
  <p><strong>Prop drilling</strong> occurs when state and setter callbacks are passed down through intermediate components that do not use them, tightly coupling the hierarchy. While React Context can bypass intermediate components, it suffers from <strong>re-render cascades</strong>: when any value inside a single Context object updates, every component subscribed via <code>useContext()</code> re-renders, even if it only consumes an untouched property. To mitigate this:</p>
  <ul>
    <li>Split monolithic contexts into atomic domain contexts (e.g., <code>AuthContext</code>, <code>ThemeContext</code>, <code>CartContext</code>).</li>
    <li>Separate <em>state values</em> from <em>dispatch functions</em> into separate Context providers.</li>
    <li>Adopt atomic selector stores like <strong>Zustand</strong>, which use <code>useSyncExternalStore</code> to subscribe components strictly to their exact slice of state.</li>
  </ul>

  <div class="code-container">
    <span class="code-label">Zustand Atomic Store Pattern (useUserStore.ts)</span>
    <pre><code>import { create } from 'zustand';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserStoreState {
  user: UserProfile | null;
  unreadCount: number;
  setUser: (user: UserProfile) => void;
  incrementUnread: () => void;
  resetUser: () => void;
}

export const useUserStore = create&lt;UserStoreState&gt;((set) => ({
  user: null,
  unreadCount: 0,
  setUser: (user) => set({ user }),
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  resetUser: () => set({ user: null, unreadCount: 0 }),
}));

// CONSUMING COMPONENT: Only subscribes to unreadCount
// Will NOT re-render when user.name or user.avatar changes!
export const NotificationBadge = () => {
  const unreadCount = useUserStore((state) => state.unreadCount);
  return &lt;Text&gt;{unreadCount}&lt;/Text&gt;;
};</code></pre>
  </div>

  <h3>Dark Mode &amp; Runtime Theme Switching</h3>
  <p>In applications with 100+ components, theme changes must not unmount and rebuild the entire view tree. Store the active theme mode in an atomic Zustand store or read the device appearance via React Native's <code>useColorScheme()</code>. Expose semantic color tokens (e.g., <code>backgroundPrimary</code>, <code>textPrimary</code>) so components read theme values with zero re-mount overhead.</p>

  <div class="qa-section">
    <h3>Quick Review — Threading &amp; State Management (Q19 – Q25)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q19</span> What are the primary threads in a legacy React Native app, and how does this change in the New Architecture?</div>
      <div class="qa-a">Legacy React Native relies on three primary threads: (1) <strong>Main UI Thread</strong> (native view rendering and touch events), (2) <strong>JavaScript Thread</strong> (business logic and React reconciliation), and (3) <strong>Shadow Thread</strong> (Yoga Flexbox calculations). The New Architecture replaces the bridge-bound Shadow Thread: Fabric computes Yoga layout directly in C++ synchronously or concurrently alongside React 18, eliminating inter-thread message queuing bottlenecks.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q20</span> How do you execute heavy computations without blocking the JS thread?</div>
      <div class="qa-a">
        <ul>
          <li><strong>Native Module / TurboModule:</strong> Offload the computation to a native background queue (iOS <code>DispatchQueue.global().async</code> or Android Kotlin Coroutine <code>Dispatchers.Default</code>) and return the result asynchronously via a Promise.</li>
          <li><strong>Web Workers / React Native Threads:</strong> Utilize libraries such as <code>react-native-threads</code> to spin up a separate background JavaScript execution context with its own memory heap.</li>
          <li><strong>Chunking via requestAnimationFrame / setTimeout:</strong> Split large arrays into smaller batches processed across multiple 16ms animation frames.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q21</span> Compare Redux Toolkit, Zustand, and Context API for enterprise apps.</div>
      <div class="qa-a">
        <ul>
          <li><strong>Context API:</strong> Best for static, infrequently updated values (localization, active theme). Bad for dynamic, high-frequency updates due to lack of selector-based memoization.</li>
          <li><strong>Zustand:</strong> Best overall for modern React Native. Minimal boilerplate (~1.2 KB), atomic selectors that eliminate re-render cascades, direct async support, and simple outside-of-React state access.</li>
          <li><strong>Redux Toolkit:</strong> Best for large enterprises requiring strict opinionated architecture, comprehensive time-travel debugging via Redux DevTools, and complex normalized caching via RTK Query.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q22</span> Why does Context API degrade performance with high-frequency updates?</div>
      <div class="qa-a">React Context lacks selector granularity. When a Context provider receives a new value reference (e.g., <code>&lt;Context.Provider value={{ user, cart, timer }}&gt;</code>), React automatically invalidates and re-renders <strong>every single component consuming that context</strong>, even if the component only cares about <code>user</code> and only <code>timer</code> updated. In mobile apps with frequent updates (e.g., GPS tracking, chat typing, animations), this creates massive frame drops.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q23</span> What is prop drilling and what is the Z-Index state architecture?</div>
      <div class="qa-a">
        <ul>
          <li><strong>Prop Drilling:</strong> Passing props through 5-6 intermediate parent layers solely to deliver them to a leaf component, making intermediate components brittle and forcing them to re-render when props change.</li>
          <li><strong>Z-Index State Architecture:</strong> Bypassing the 2D vertical component tree by allowing leaf components to connect directly "horizontally" to an atomic external store (such as Zustand) via specific selectors. Intermediate container components remain purely presentational and never re-render.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q24</span> How do you implement dark mode and runtime theme switching across 100+ components?</div>
      <div class="qa-a">Create a centralized theme token system with light and dark palettes. Store the current theme mode (<code>'light' | 'dark' | 'system'</code>) in a Zustand store persisted via MMKV. Expose a custom hook <code>useTheme()</code> that selects the active color palette. Because Zustand uses atomic subscriptions, updating the theme immediately triggers style updates across all subscribed components without unmounting the navigation container or resetting screen state.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q25</span> How does React Native manage memory and garbage collection?</div>
      <div class="qa-a">React Native uses a split memory model:
        <ul>
          <li><strong>JavaScript Memory:</strong> Managed by Hermes' generational garbage collector. Young objects are allocated in a nursery heap and collected frequently with sub-millisecond pauses. Surviving objects move to the older generation collected during idle periods.</li>
          <li><strong>Native Memory:</strong> Managed by ARC (Automatic Reference Counting) in iOS Swift/Obj-C, and by the ART Garbage Collector in Android Kotlin/Java.</li>
          <li><strong>Bridge / JSI Retention:</strong> When JS references a native host object via JSI, a C++ wrapper increments the reference count. If JavaScript retains an event listener closure that holds a native pointer, a retain cycle will leak native memory until explicitly unbound.</li>
        </ul>
      </div>
    </div>
  </div>
`;
