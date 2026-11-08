module.exports = `
  <h2 id="sec-7">7. Networking, DevOps, Monorepos &amp; Micro-Frontends</h2>

  <h3>Offline-First Sync Architecture</h3>
  <div class="diagram-box">====================================================================================================
OFFLINE-FIRST SYNCHRONIZATION PIPELINE
====================================================================================================
[User Action] ---> [Optimistic Write to Local DB (WatermelonDB / SQLite / MMKV)]
                                      |
                                      v
                      [Record Added to Persistent Sync Queue]
                                      |
                     [NetInfo Emits isConnected: true]
                                      |
                                      v
                      [Flush Queue via Batched API Request]
                                      |
                     +----------------+----------------+
                     v                                 v
            [200 OK: Mark Synced]             [409 Conflict: Apply Resolution Policy]
                                              - Server-Wins (Default for timestamps)
                                              - Client-Wins (Draft edits)
                                              - Field-Level 3-Way Merge</div>

  <h3>Expo (Managed Workflow) vs. Vanilla React Native CLI</h3>
  <table>
    <thead>
      <tr>
        <th>Engineering Dimension</th>
        <th>Expo (Managed Workflow &amp; Prebuild)</th>
        <th>Vanilla React Native CLI</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Native Code Management</strong></td>
        <td>Native <code>/ios</code> and <code>/android</code> folders are generated dynamically at build time via <code>npx expo prebuild</code> using <strong>Config Plugins</strong>.</td>
        <td>Native project files are checked directly into git. Upgrades require manual file diffing and project patching.</td>
      </tr>
      <tr>
        <td><strong>Custom Native Code</strong></td>
        <td>Supported seamlessly via Expo Modules API and Config Plugins.</td>
        <td>Direct access to <code>AppDelegate.mm</code>, <code>MainActivity.kt</code>, and native Xcode/Gradle project files.</td>
      </tr>
      <tr>
        <td><strong>Cloud Build &amp; OTA</strong></td>
        <td>First-class integration with <strong>EAS Build</strong> (remote iOS/Android cloud compilation) and <strong>EAS Update</strong>.</td>
        <td>Requires configuring third-party CI/CD runners (Fastlane, Mac minis) and manual OTA servers (CodePush).</td>
      </tr>
      <tr>
        <td><strong>Upgrade Complexity</strong></td>
        <td>Single dependency upgrade (<code>npx expo install expo@latest</code>) with guaranteed SDK compatibility.</td>
        <td>High manual diffing overhead across Xcode build configurations, Podfiles, and Gradle scripts.</td>
      </tr>
    </tbody>
  </table>

  <h3>CodePush / OTA Updates: Mechanisms &amp; Rollbacks</h3>
  <p><strong>Over-The-Air (OTA) updates</strong> (via Microsoft CodePush or Expo EAS Update) allow developers to push updated JavaScript bundles and asset changes directly to installed user devices, completely bypassing App Store review queues:</p>
  <ul>
    <li><strong>Runtime Mechanics:</strong> On app launch, the native OTA SDK queries the update server with the current binary version and bundle hash. If an update is available, it downloads the zip package in the background, verifies its cryptographic signature, and applies it on the next cold launch (or immediately via <code>installMode: IMMEDIATE</code>).</li>
    <li><strong>App Store Guidelines Compliance:</strong> Apple App Store Review Guideline 3.3.2 permits OTA updates <em>only</em> if the code does not alter the fundamental purpose or core features of the app and does not introduce executable native machine binary changes.</li>
    <li><strong>Automatic Rollback on Crash:</strong> If an OTA bundle triggers an uncaught JavaScript exception during initial boot, the native SDK detects the startup failure, aborts the new bundle, and rolls back immediately to the previous stable release bundle.</li>
  </ul>

  <h3>Enterprise CI/CD Architecture (Fastlane + Match)</h3>
  <div class="diagram-box">====================================================================================================
ENTERPRISE CI/CD PIPELINE (FASTLANE & GITHUB ACTIONS)
====================================================================================================
[GitHub Push to release/*] ---> [Linting, TypeScript Check, Jest Unit & Detox E2E Tests]
                                               |
                     +-------------------------+-------------------------+
                     v                                                   v
         [Fastlane iOS (lane :beta)]                        [Fastlane Android (lane :beta)]
         - Pull certs via Fastlane Match (git/S3)           - Decode signing keystore from CI secrets
         - Auto-increment build number                      - Run Gradle bundleRelease (AAB)
         - Build signed IPA via gym                         - Upload AAB to Play Console Internal Track
         - Upload to Apple TestFlight / App Store           - Generate ProGuard mapping artifact for Sentry</div>

  <h3>Monorepos, Micro-Frontends &amp; White-Label Architecture</h3>
  <ul>
    <li><strong>Monorepo Structure (Turborepo / pnpm):</strong> Centralizes shared UI design systems, shared TypeScript business logic, and multiple mobile apps in one repository. Metro must be configured with <code>watchFolders</code> pointing to workspace package roots and <code>nodeModulesPaths</code> to resolve symlinked monorepo dependencies.</li>
    <li><strong>White-Label Architecture:</strong> A single core codebase generates multiple branded mobile applications (e.g., Client A, Client B) by swapping brand theme configuration tokens, asset bundles, and bundle IDs at prebuild time.</li>
    <li><strong>React Native for Web:</strong> Enables running the same React Native components on desktop browsers by mapping primitives (<code>&lt;View&gt;</code> to <code>&lt;div&gt;</code>, <code>&lt;Text&gt;</code> to <code>&lt;span&gt;</code>) using <code>react-native-web</code> and Metro/Webpack platform extensions (<code>.web.tsx</code>).</li>
  </ul>

  <div class="code-container">
    <span class="code-label">React Native GraphQL Offline-Ready Setup (ApolloClient.ts)</span>
    <pre><code>import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from 'apollo3-cache-persist';

const httpLink = new HttpLink({ uri: 'https://api.company.com/graphql' });
const wsLink = new GraphQLWsLink(createClient({ url: 'wss://api.company.com/graphql' }));

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' &amp;&amp; def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const createApolloClient = async () => {
  const cache = new InMemoryCache();
  // Persist Apollo cache to local storage for instant offline browsing
  await persistCache({ cache, storage: AsyncStorage, maxSize: 10485760 });
  return new ApolloClient({ link: splitLink, cache });
};</code></pre>
  </div>

  <div class="qa-section">
    <h3>Quick Review — Networking, DevOps &amp; Monorepos (Q44 – Q48)</h3>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q44</span> What is the offline-first architecture pattern and how is a sync queue implemented?</div>
      <div class="qa-a">In an offline-first architecture, the UI writes mutations immediately to a fast local database (WatermelonDB, SQLite, or MMKV) and reflects changes optimistically on screen. Concurrently, the mutation is serialized into a persistent SQLite/storage sync queue. When <code>@react-native-community/netinfo</code> detects an active internet connection, a sync worker flushes queued requests in order with exponential backoff retry. Conflicts (HTTP 409) are resolved using strategies like Server-Wins (based on updated-at timestamps) or custom field merging.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q45</span> How does CodePush / EAS Update enable OTA (over-the-air) updates?</div>
      <div class="qa-a">The native mobile app embeds an OTA client library. When the app boots, the client queries the update server with the binary version (e.g. <code>1.4.0</code>) and bundle hash. If an update is detected, it downloads the new JavaScript bundle and asset manifest in the background. On the next app cold boot, the native host points the JavaScript engine to the newly cached bundle path on the local filesystem. If the new bundle crashes during startup, the client automatically rolls back to the previous stable release.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q46</span> What is a monorepo and how do you structure a React Native app inside one?</div>
      <div class="qa-a">A monorepo holds multiple applications and shared packages (e.g., UI component library, analytics SDK, business logic) in a single repository managed by Turborepo or pnpm. In React Native, the Metro bundler does not automatically follow symlinks outside the project root. You must configure <code>metro.config.js</code> with:
        <ul>
          <li><code>watchFolders: [path.resolve(__dirname, '../../packages')]</code> to monitor shared workspaces.</li>
          <li><code>resolver.nodeModulesPaths</code> to resolve hoisted packages correctly without duplicate module collisions.</li>
        </ul>
      </div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q47</span> How do you integrate GraphQL with React Native?</div>
      <div class="qa-a">Use <strong>Apollo Client</strong> or <strong>Urql</strong>. Wrap the application root in <code>&lt;ApolloProvider&gt;</code>. Configure a split link routing queries and mutations through HTTP (<code>HttpLink</code>) and real-time live events through WebSockets (<code>GraphQLWsLink</code>). To support offline usage, pair <code>InMemoryCache</code> with <code>apollo3-cache-persist</code> backed by <code>@react-native-async-storage/async-storage</code> or MMKV so cached queries persist across app terminations.</div>
    </div>

    <div class="qa-block">
      <div class="qa-q"><span class="qa-badge">Q48</span> How does CI/CD work for React Native (Fastlane, GitHub Actions, Bitrise)?</div>
      <div class="qa-a">CI/CD pipelines automate build and deployment workflows:
        <ul>
          <li><strong>Pull Request CI:</strong> Runs TypeScript compilation, ESLint, Jest unit tests, and Detox E2E smoke tests on virtual emulators.</li>
          <li><strong>Release CD:</strong> On merge to main, a GitHub Actions/Bitrise runner executes <strong>Fastlane</strong>:
            <ul>
              <li><em>iOS:</em> Uses <code>fastlane match</code> to securely decrypt certificates and provisioning profiles from an encrypted git/S3 repo, compiles the IPA via <code>gym</code>, and uploads it to Apple TestFlight.</li>
              <li><em>Android:</em> Decodes the production keystore, runs Gradle <code>bundleRelease</code> to generate an Android App Bundle (AAB), and uploads it to the Google Play Console internal testing track.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
`;
