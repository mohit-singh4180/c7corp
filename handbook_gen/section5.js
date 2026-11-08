module.exports = `
  <h2 id="sec-5">5. Advanced Animations, Gestures &amp; Worklets</h2>

  <h3>Core Animated API: JS-Driven vs. Native Driver</h3>
  <ul>
    <li><strong>JS-Driven Animations:</strong> When <code>useNativeDriver: false</code> (or omitted), animation frame ticks are calculated in JavaScript on every 16ms tick. Each calculated value is serialized across the bridge to update native views. If the JS thread performs heavy data work or component re-renders, the animation stutters visibly and drops frames.</li>
    <li><strong><code>useNativeDriver: true</code>:</strong> Serializes the entire animation configuration graph once to the native OS layer before starting. The native rendering thread (iOS <code>CADisplayLink</code> / Android <code>Choreographer</code>) runs the animation at 60/120 FPS completely uninterrupted by JavaScript thread load.
      <ul>
        <li><em>Supported Properties:</em> Non-layout properties only: <code>transform</code> (translate, scale, rotate, skew) and <code>opacity</code>.</li>
        <li><em>Unsupported Properties:</em> Layout properties: <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code>, <code>padding</code>, <code>flex</code>, and <code>backgroundColor</code> (because updating them triggers a synchronous Yoga re-layout calculation).</li>
      </ul>
    </li>
  </ul>

  <h3>React Native Reanimated (v2/v3): Worklets &amp; Shared Values</h3>
  <p><strong>Reanimated</strong> re-architected mobile animation by introducing a secondary JavaScript execution context that runs directly on the UI thread:</p>
  <ul>
    <li><strong>Worklets:</strong> Small JavaScript functions annotated with the <code>'worklet';</code> directive. The Reanimated Babel plugin compiles these functions so they can be dispatched to and executed directly by the UI-thread JS runtime with microsecond latency.</li>
    <li><strong>Shared Values (<code>useSharedValue</code>):</strong> Mutable reactive variables stored in shared C++ memory. Both the JavaScript thread and the UI thread can read and write to them without message queue latency.</li>
    <li><strong>Animated Styles (<code>useAnimatedStyle</code>):</strong> Pure worklet functions returning style objects that update synchronously on the UI thread whenever shared values change.</li>
  </ul>

  <div class="code-container">
    <span class="code-label">Reanimated v3 Declarative Gesture Implementation (SwipeableCard.tsx)</span>
    <pre><code>import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.35;

export const SwipeableCard = ({ onDismiss, title }: { onDismiss: () => void; title: string }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Pan gesture evaluated directly on the native UI thread
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      'worklet';
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      'worklet';
      if (Math.abs(e.translationX) > SWIPE_THRESHOLD) {
        const targetX = Math.sign(e.translationX) * SCREEN_WIDTH * 1.5;
        translateX.value = withTiming(targetX, { duration: 220 }, () => {
          runOnJS(onDismiss)(); // Trigger JS callback after animation ends
        });
      } else {
        translateX.value = withSpring(0, { damping: 14, stiffness: 120 });
        translateY.value = withSpring(0, { damping: 14, stiffness: 120 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: \`\${(translateX.value / SCREEN_WIDTH) * 18}deg\` },
      ],
    };
  });

  return (
    &lt;GestureDetector gesture={panGesture}&gt;
      &lt;Animated.View style={[styles.card, cardStyle]}&gt;
        &lt;Text style={styles.title}&gt;{title}&lt;/Text&gt;
      &lt;/Animated.View&gt;
    &lt;/GestureDetector&gt;
  );
};

const styles = StyleSheet.create({
  card: { width: SCREEN_WIDTH - 32, height: 160, backgroundColor: '#ffffff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6 },
  title: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
});</code></pre>
  </div>

  <h3>Gesture Handling: Responder System vs. Gesture Handler</h3>
  <div class="diagram-box">====================================================================================================
REACT NATIVE RESPONDER SYSTEM (Legacy Touch Pipeline)
====================================================================================================
[Native Touch Event] ---> [Bridge Serialization] ---> [JS Thread Responder Tree Traversal] ---> [Action]
Bottleneck: Touch events must pass over the bridge. If the JS thread is busy, touches drop or lag.

====================================================================================================
REACT NATIVE GESTURE HANDLER (Modern Native Recognizers)
====================================================================================================
[Native Touch Event] ---> [Platform Gesture Recognizers (UIPanGestureRecognizer / MotionEvent)]
                                            |
                                            v (Direct Native Evaluation on UI Thread)
                       [Executes Reanimated Worklet on UI Thread] (Zero Frame Lag)</div>

  <div class="qa-section">
    <h3>Quick Review — Animations &amp; Gestures (Q34 – Q38)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q34</span> What is the difference between Animated API with useNativeDriver and without it?</div>
      <div class="qa-a">Without <code>useNativeDriver</code>, animation steps are calculated on the JS thread and transmitted over the bridge on every frame; any JS thread spike causes visible stutter. With <code>useNativeDriver: true</code>, React Native serializes the animation graph to the native driver up-front; native display links (iOS <code>CADisplayLink</code> / Android <code>Choreographer</code>) drive view updates at 60/120 FPS directly. Note: <code>useNativeDriver: true</code> only supports <code>transform</code> and <code>opacity</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q35</span> How does Reanimated 2/3 differ from the core Animated API?</div>
      <div class="qa-a">The core <code>Animated</code> API has limited declarative nodes and cannot execute arbitrary logic on the UI thread without dropping back to JavaScript. Reanimated 2/3 spins up a dedicated JavaScript runtime directly on the UI thread. It executes <strong>Worklets</strong> directly on the UI thread, manipulates <strong>Shared Values</strong> in direct C++ memory, and interfaces directly with <code>react-native-gesture-handler</code> for zero-latency 120 FPS physical gestures.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q36</span> What is a Worklet and how does it execute on the UI thread?</div>
      <div class="qa-a">A Worklet is a JavaScript function beginning with the <code>'worklet';</code> string directive. At build time, the Reanimated Babel plugin extracts the function, analyzes captured closures, serializes them, and registers them with the UI-thread JS runtime. When invoked, it runs synchronously on the UI thread without crossing back to the main JS thread. To pass data from a worklet back to the JS thread, wrap the callback in <code>runOnJS(callback)(args)</code>.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q37</span> Compare React Native Gesture Handler with the legacy Responder System.</div>
      <div class="qa-a">The legacy Responder System passes raw native touch coordinates over the bridge into JavaScript to determine responder grants and responder moves. If the JS thread is congested, gestures freeze. React Native Gesture Handler binds gestures directly to underlying platform gesture recognizers (<code>UIPanGestureRecognizer</code> on iOS, <code>MotionEvent</code> recognizers on Android). Gesture recognition happens natively, and updates are passed directly to Reanimated worklets on the UI thread without touching the JS thread.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q38</span> How would you implement a swipeable dismiss card (like Tinder) in React Native?</div>
      <div class="qa-a">Use <code>GestureDetector</code> with <code>Gesture.Pan()</code> from <code>react-native-gesture-handler</code> combined with <code>useSharedValue</code> and <code>useAnimatedStyle</code> from <code>react-native-reanimated</code>. Track <code>event.translationX</code> and <code>event.translationY</code> inside the worklet. In <code>onEnd</code>, check if horizontal travel exceeds a dismissal threshold (e.g., 35% screen width): if so, animate the card offscreen using <code>withTiming</code> and call the dismissal callback via <code>runOnJS</code>; otherwise, snap the card back to center using <code>withSpring</code> with damping and stiffness tuning.</div>
    </div>
  </div>
`;
