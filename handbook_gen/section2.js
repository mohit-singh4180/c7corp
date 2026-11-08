module.exports = `
  <h2 id="sec-2">2. Advanced Performance Optimization &amp; Virtualized Lists</h2>

  <h3>Debugging 45-50 FPS Drops: Thread Isolation</h3>
  <p>Smooth mobile animation requires 60 FPS (16.6ms per frame) or 120 FPS on ProMotion/High-Refresh displays (8.3ms per frame). Performance bottlenecks must be isolated between the <strong>UI Thread</strong> and the <strong>JS Thread</strong> using tools such as Flipper, React DevTools Profiler, and the native FPS Monitor:</p>
  <ul>
    <li><strong>JS Thread Drops (UI Thread at 60 FPS, JS Thread &lt; 45 FPS):</strong> Indicates heavy synchronous JavaScript computations, massive JSON parsing, long-running loops, un-memoized component trees re-rendering unnecessarily, or unthrottled state updates on scroll events. Touch interactions and button presses feel unresponsive, but ongoing native scroll animations remain smooth.</li>
    <li><strong>UI Thread Drops (JS Thread at 60 FPS, UI Thread &lt; 45 FPS):</strong> Caused by heavy native layout recalculations, excessively deeply nested native view hierarchies, complex shadow/clipping path rendering, large uncompressed image decoding on the main thread, or animations driving layout properties (<code>width</code>, <code>height</code>, <code>margin</code>) without native acceleration.</li>
  </ul>

  <h3>FlatList Virtualization vs. Shopify FlashList Cell Recycling</h3>
  <p>Handling large dynamic lists efficiently is critical for mobile performance. While FlatList virtualizes by unmounting offscreen views, FlashList recycles view cells identically to native iOS <code>UICollectionView</code> and Android <code>RecyclerView</code>:</p>

  <table>
    <thead>
      <tr>
        <th>Performance Dimension</th>
        <th>React Native FlatList (Virtualization)</th>
        <th>Shopify FlashList (Cell Recycling)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Memory Strategy</strong></td>
        <td>Unmounts off-screen components and allocates new views continuously when scrolling. High garbage collection pressure.</td>
        <td>Recycles existing native views and re-binds new item data into the existing view pool. Minimal GC allocation.</td>
      </tr>
      <tr>
        <td><strong>Layout Calculation</strong></td>
        <td>Measures element dimensions asynchronously after mounting unless explicit <code>getItemLayout</code> is provided.</td>
        <td>Requires <code>estimatedItemSize</code>. Performs instant layout calculations in O(1) time without frame drops.</td>
      </tr>
      <tr>
        <td><strong>Blank Spot Resistance</strong></td>
        <td>Prone to white blank spots during rapid fling scrolling due to delayed async bridge view creation.</td>
        <td>Virtually eliminates blank areas during high-velocity scrolls by preserving pre-warmed native views.</td>
      </tr>
      <tr>
        <td><strong>CPU &amp; Battery Impact</strong></td>
        <td>High CPU usage due to continuous native view instantiation and de-allocation.</td>
        <td>Up to 5x lower CPU consumption and significantly lower battery drain on low-end devices.</td>
      </tr>
    </tbody>
  </table>

  <div class="code-container">
    <span class="code-label">Production List Optimization (MediaList.tsx)</span>
    <pre><code>import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';

interface MediaItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

const ITEM_HEIGHT = 84;

// 1. Memoized list row: prevents re-renders when parent state updates
const MediaRow = memo(({ item }: { item: MediaItem }) => (
  &lt;View style={styles.row}&gt;
    &lt;FastImage
      style={styles.thumb}
      source={{ uri: item.imageUrl, priority: FastImage.priority.normal, cache: FastImage.cacheControl.immutable }}
      resizeMode={FastImage.resizeMode.cover}
    /&gt;
    &lt;View style={styles.meta}&gt;
      &lt;Text style={styles.title} numberOfLines={1}&gt;{item.title}&lt;/Text&gt;
      &lt;Text style={styles.category}&gt;{item.category}&lt;/Text&gt;
    &lt;/View&gt;
  &lt;/View&gt;
));

export const MediaList = ({ items }: { items: MediaItem[] }) => {
  // 2. Stable renderItem callback avoiding allocation on render
  const renderItem = useCallback(({ item }: { item: MediaItem }) => &lt;MediaRow item={item} /&gt;, []);
  const keyExtractor = useCallback((item: MediaItem) => item.id, []);

  return (
    &lt;FlashList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={ITEM_HEIGHT} // Required for FlashList O(1) cell recycling
      overrideItemLayout={(layout) => { layout.size = ITEM_HEIGHT; }}
    /&gt;
  );
};

const styles = StyleSheet.create({
  row: { height: ITEM_HEIGHT, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#e2e8f0' },
  thumb: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f1f5f9' },
  meta: { flex: 1, marginLeft: 12 },
  title: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
  category: { fontSize: 11, color: '#64748b', marginTop: 2 },
});</code></pre>
  </div>

  <h3>Scroll Component Family: ScrollView vs. FlatList vs. SectionList vs. VirtualizedList</h3>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Virtualization</th>
        <th>Primary Use Case</th>
        <th>Trade-off / Gotcha</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>ScrollView</strong></td>
        <td>None (All children rendered into memory immediately)</td>
        <td>Small forms, static screens, content &lt; 20 items</td>
        <td>Will crash with Out-of-Memory (OOM) on large datasets.</td>
      </tr>
      <tr>
        <td><strong>FlatList</strong></td>
        <td>Yes (Window-based unmounting of offscreen items)</td>
        <td>Homogeneous lists of dynamic length (feeds, product grids)</td>
        <td>Occasional blank flashes during rapid scroll if un-tuned.</td>
      </tr>
      <tr>
        <td><strong>SectionList</strong></td>
        <td>Yes (Virtualized with sticky section headers)</td>
        <td>Categorized/grouped lists (contacts, settings, grouped schedules)</td>
        <td>Extra memory overhead per section header node.</td>
      </tr>
      <tr>
        <td><strong>VirtualizedList</strong></td>
        <td>Base class for FlatList and SectionList</td>
        <td>Custom non-array data structures (e.g. linked lists, graph trees)</td>
        <td>Requires manual <code>getItem</code> and <code>getItemCount</code> implementation.</td>
      </tr>
    </tbody>
  </table>

  <h3>Stale Closures, Memoization &amp; Inline Handlers</h3>
  <ul>
    <li><strong>Stale Closures:</strong> Occurs when a callback, <code>useEffect</code>, or <code>useCallback</code> captures an outer variable in its lexical scope without specifying it in the dependency array. On subsequent renders, the closure holds an outdated value. Fixed via functional state updaters: <code>setCount(prev => prev + 1)</code> or <code>useRef</code>.</li>
    <li><strong><code>React.memo</code>:</strong> Wraps a functional component to prevent re-rendering unless its props change via shallow equality (<code>prevProps === nextProps</code>). Essential for list row items.</li>
    <li><strong><code>useMemo</code>:</strong> Caches the result of an expensive calculation between renders based on dependencies.</li>
    <li><strong><code>useCallback</code>:</strong> Returns a memoized version of the callback function so child components wrapped in <code>React.memo</code> do not break memoization due to reference inequality.</li>
    <li><strong>Inline Objects &amp; Arrow Functions in JSX:</strong> Writing <code>style={{ margin: 10 }}</code> or <code>onPress={() => doSomething(item.id)}</code> creates a new object and function reference on every single render. In list cells, this triggers unnecessary re-renders of the entire subtree and triggers high garbage collection pauses.</li>
    <li><strong>Image Optimization:</strong> Core <code>Image</code> decodes full bitmaps on the main thread and lacks disk persistence caching. Using <code>react-native-fast-image</code> or <code>expo-image</code> provides hardware-accelerated decoding, aggressive disk/memory LRU caching, WebP format support, and downsampling to target viewport size.</li>
  </ul>

  <div class="qa-section">
    <h3>Quick Review — Performance &amp; Virtualized Lists (Q9 – Q18)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q9</span> How do you debug 45–50 FPS drops in React Native?</div>
      <div class="qa-a">Open the in-app Developer Menu and enable the <strong>Perf Monitor</strong> to observe UI and JS FPS simultaneously:
        <ul>
          <li><strong>JS FPS drops:</strong> The JavaScript thread is blocked. Inspect using Flipper / React DevTools Profiler to locate slow component render cycles, unmemoized calculations, or non-debounced search/filter loops. Move heavy work to background workers or TurboModules.</li>
          <li><strong>UI FPS drops:</strong> The native main thread is overloaded. Profile using Xcode Time Profiler (iOS) or Android GPU Profiling / Systrace. Reduce view tree hierarchy depth, remove heavy shadow/elevation effects, and ensure animations use <code>useNativeDriver: true</code> or Reanimated.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q10</span> What FlatList props would you tune for a deeply nested, media-heavy list?</div>
      <div class="qa-a">Tune the following props to prevent frame drops:
        <ul>
          <li><code>windowSize={5}</code>: Lowers the render window buffer (default is 21 screens, which consumes massive memory).</li>
          <li><code>maxToRenderPerBatch={5}</code>: Controls the number of items rendered per scroll batch.</li>
          <li><code>initialNumToRender={8}</code>: Renders exactly enough items to fill the initial screen, accelerating initial mount.</li>
          <li><code>removeClippedSubviews={Platform.OS === 'android'}</code>: Detaches offscreen native views from the native hierarchy.</li>
          <li><code>getItemLayout</code>: Provides predefined item heights (skipping dynamic native layout measurement).</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q11</span> Why does FlashList outperform FlatList?</div>
      <div class="qa-a">FlatList continuously unmounts offscreen React components and destroys their underlying native platform views, then re-allocates new native views as the user scrolls back. This causes constant garbage collection pauses and CPU spikes. Shopify's FlashList uses <strong>cell recycling</strong>: it creates a fixed pool of native views and re-binds new item data into the existing native view instances as they scroll into view, eliminating allocation/deallocation overhead.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q12</span> What is a stale closure and how do you fix it?</div>
      <div class="qa-a">A stale closure happens when a function inside a hook (e.g. <code>useEffect</code>, <code>useCallback</code>) captures variables from an earlier render cycle because the dependency array was empty or incomplete:
        <pre><code>// ❌ STALE: count is captured as initial value (0) forever
useEffect(() => {
  const timer = setInterval(() => console.log(count), 1000);
  return () => clearInterval(timer);
}, []); // missing count dependency

// ✅ FIX 1: Functional state updater (eliminates closure dependence)
setCount(prev => prev + 1);

// ✅ FIX 2: Mutable ref to always read latest value
const countRef = useRef(count);
countRef.current = count;</code></pre>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q13</span> When do you use React.memo, useMemo, and useCallback?</div>
      <div class="qa-a">
        <ul>
          <li><strong><code>React.memo</code>:</strong> Use on child components that receive primitive props or memoized callbacks, especially list item rows, to skip re-rendering when parent state changes.</li>
          <li><strong><code>useMemo</code>:</strong> Use when computing computationally expensive values (e.g., sorting/filtering 1,000+ items) so the calculation runs only when inputs change.</li>
          <li><strong><code>useCallback</code>:</strong> Use to wrap function definitions passed down to <code>React.memo</code>-wrapped child components to prevent breaking their shallow equality checks.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q14</span> What are inline objects/arrow functions in JSX and why are they harmful?</div>
      <div class="qa-a">Writing <code>&lt;Item onPress={() =&gt; handlePress(id)} style={{ color: 'red' }} /&gt;</code> instantiates a new function object and a new style object in the JavaScript heap on <em>every single render pass</em>. This breaks <code>React.memo</code> on child components (since <code>newFunction !== oldFunction</code> by reference) and forces the Hermes garbage collector to run frequent collection cycles, causing noticeable micro-stutters during 60 FPS animations.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q15</span> What is the difference between ScrollView and FlatList?</div>
      <div class="qa-a"><code>ScrollView</code> renders all of its child elements into native memory at once regardless of whether they are visible on screen. It is suitable only for short, static content (e.g., settings forms). <code>FlatList</code> is virtualized: it only renders items currently visible inside its viewport window plus a small buffer, unmounting offscreen views to maintain a flat memory footprint even with 10,000+ items.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q16</span> What is VirtualizedList and when would you use it directly?</div>
      <div class="qa-a"><code>VirtualizedList</code> is the low-level base component behind <code>FlatList</code> and <code>SectionList</code>. While <code>FlatList</code> assumes data is provided as a standard JavaScript array, <code>VirtualizedList</code> accepts custom non-array data structures (such as immutable trees, linked lists, or database cursors) via custom <code>getItem(data, index)</code> and <code>getItemCount(data)</code> functions. Use it when consuming paged streaming data directly from a local database without converting to an in-memory array.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q17</span> Why are keys important in lists and how is extraData used?</div>
      <div class="qa-a">
        <ul>
          <li><strong>Keys:</strong> React uses keys to track item identity during reconciliation. Using array index (<code>keyExtractor={(item, index) => String(index)}</code>) causes visual bugs, incorrect item animations, and state corruption when items are inserted, deleted, or re-ordered. Always use a unique stable ID (e.g., <code>item.id</code>).</li>
          <li><strong><code>extraData</code>:</strong> <code>FlatList</code> implements <code>PureComponent</code> internally and only re-renders when the <code>data</code> prop reference changes. If list rows depend on external state (e.g., <code>selectedId</code>), passing <code>extraData={selectedId}</code> ensures the list re-renders when that external state changes.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q18</span> How do you optimize image rendering in React Native?</div>
      <div class="qa-a">Standard React Native <code>&lt;Image&gt;</code> decodes bitmaps on the main thread and lacks persistent disk caching. Use <strong><code>react-native-fast-image</code></strong> or <strong><code>expo-image</code></strong>:
        <ul>
          <li>Enables aggressive disk and memory LRU caching with HTTP header support.</li>
          <li>Supports high-efficiency formats: <strong>WebP</strong> (25-34% smaller than JPEG at equal quality) and AVIF.</li>
          <li>Pre-loads and warms cache for upcoming images via <code>FastImage.preload()</code>.</li>
          <li>Downsamples large camera/network images to match the exact physical display dimensions before rendering into RAM, avoiding multi-megabyte bitmap allocations.</li>
        </ul>
      </div>
    </div>
  </div>
`;
