export default function NovaConnectDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="nova-connect-introduction" className={`docs-section ${hash === "nova-connect-introduction" ? "active" : ""}`}>
        <h1>Nova Connect - Introduction</h1>
        <p>
          Nova Connect is the wallet adapter for Cedra dApps that connect to
          <strong> Nova Desk</strong> on desktop and <strong>Nova Wallet</strong> on mobile.
          The package exposes plugin-style and AIP-62 wallet-standard APIs backed by the same
          transport-aware client.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Connect to Nova Desk through the local bridge at <code>http://127.0.0.1:21984</code></li>
          <li>Connect to Nova Wallet through the hosted relay and <code>inferenco://</code> deeplinks</li>
          <li>Support Cedra wallet-standard chains through <code>@cedra-labs/wallet-standard</code></li>
          <li>Detect injected providers on <code>window.inferenco</code>, <code>window.nova</code>, and branded aliases</li>
          <li>Use end-to-end encrypted mobile communication with X25519, HKDF-SHA256, and XChaCha20-Poly1305</li>
          <li>Persist desktop and mobile sessions across page reloads</li>
          <li>Ship ESM, CommonJS, and TypeScript declaration files</li>
        </ul>
        <h3>Package</h3>
        <ul>
          <li><code>@inferenco/nova-wallet-adapter</code> - Nova wallet adapter package (v0.1.0)</li>
        </ul>
        <p>
          <strong>Note:</strong> There is no <code>@inferenco/nova-connect</code> package.
          Use <code>@inferenco/nova-wallet-adapter</code>.
        </p>
      </div>

      <div id="nova-connect-installation" className={`docs-section ${hash === "nova-connect-installation" ? "active" : ""}`}>
        <h1>Nova Connect - Installation</h1>
        <p>Install the Nova wallet adapter in your project:</p>
        <div className="code-block language-bash">
          <code>{`npm install @inferenco/nova-wallet-adapter`}</code>
        </div>
        <p>or with yarn:</p>
        <div className="code-block language-bash">
          <code>{`yarn add @inferenco/nova-wallet-adapter`}</code>
        </div>
        <p>or with pnpm:</p>
        <div className="code-block language-bash">
          <code>{`pnpm add @inferenco/nova-wallet-adapter`}</code>
        </div>
        <h2>Entry Points</h2>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Import path</th>
                <th>Exports</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>@inferenco/nova-wallet-adapter</code></td>
                <td><code>NovaWallet</code>, <code>NovaClient</code>, errors, types, constants, and utilities</td>
              </tr>
              <tr>
                <td><code>@inferenco/nova-wallet-adapter/aip62</code></td>
                <td><code>registerNovaWallet</code> and <code>createNovaAIP62Wallet</code></td>
              </tr>
              <tr>
                <td><code>@inferenco/nova-wallet-adapter/auto-register</code></td>
                <td>Side-effect registration for AIP-62 wallet-standard consumers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="nova-connect-quickstart" className={`docs-section ${hash === "nova-connect-quickstart" ? "active" : ""}`}>
        <h1>Nova Connect - Quick Start</h1>
        <p>Choose the integration surface that matches your wallet stack.</p>

        <h2>Method 1: AIP-62 Wallet-Standard</h2>
        <p>Use auto-registration when your dApp discovers wallets through <code>@cedra-labs/wallet-standard</code>.</p>
        <div className="code-block language-tsx">
          <code>{`import "@inferenco/nova-wallet-adapter/auto-register";
import { getCedraWallets } from "@cedra-labs/wallet-standard";

const { cedraWallets } = getCedraWallets();
const wallet = cedraWallets.find((candidate) => candidate.name === "Nova Connect");

if (!wallet) {
  throw new Error("Nova Connect was not registered");
}

const response = await wallet.features["cedra:connect"].connect();
const account = response.args;`}</code>
        </div>
        <p>Register manually when you need explicit options:</p>
        <div className="code-block language-tsx">
          <code>{`import { registerNovaWallet } from "@inferenco/nova-wallet-adapter/aip62";

registerNovaWallet({
  forceRegistration: true,
  desktopRegistration: true,
});`}</code>
        </div>

        <h2>Method 2: Plugin-Style Adapter</h2>
        <p>Use <code>NovaWallet</code> when your dApp expects a plugin-style adapter instance.</p>
        <div className="code-block language-tsx">
          <code>{`import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();
const account = await wallet.connect();

await wallet.signMessage({
  message: "Hello Nova",
  nonce: "unique-nonce-123",
});

const result = await wallet.signAndSubmitTransaction({
  data: {
    function: "0x1::coin::transfer",
    typeArguments: ["0x1::cedra_coin::CedraCoin"],
    functionArguments: ["0xrecipient", 100],
  },
});

console.log(account.address.toString(), result.hash);
await wallet.disconnect();`}</code>
        </div>

        <h2>Method 3: Direct NovaClient</h2>
        <p>Use <code>NovaClient</code> when you need direct control over connection, signing, and sessions.</p>
        <div className="code-block language-tsx">
          <code>{`import { Network } from "@cedra-labs/ts-sdk";
import { NovaClient } from "@inferenco/nova-wallet-adapter";

const client = new NovaClient({
  networkOverride: Network.DEVNET,
});

const { account, network } = await client.connect();
const signed = await client.signMessage({
  message: "Hello Nova",
  nonce: "unique-nonce-123",
});

console.log(account.address.toString(), network?.name, signed.signature);
await client.disconnect();`}</code>
        </div>
      </div>

      <div id="nova-connect-react-integration" className={`docs-section ${hash === "nova-connect-react-integration" ? "active" : ""}`}>
        <h1>Nova Connect - React Integration</h1>
        <p>Keep one adapter instance for the app lifecycle and expose connect state through a hook.</p>
        <div className="code-block language-tsx">
          <code>{`import { useEffect, useState } from "react";
import {
  NovaAdapterError,
  NovaErrorCode,
  NovaWallet,
} from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();

export function useNovaWallet() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    wallet.account().then(setAccount).catch(() => {});
  }, []);

  const connect = async () => {
    setLoading(true);
    setError(null);

    try {
      setAccount(await wallet.connect());
    } catch (err) {
      if (err instanceof NovaAdapterError) {
        switch (err.code) {
          case NovaErrorCode.NotInstalled:
            setError("Please install Nova Desk or Nova Wallet");
            break;
          case NovaErrorCode.UserRejected:
            setError("Connection rejected");
            break;
          case NovaErrorCode.ConnectionTimeout:
            setError("Connection timed out");
            break;
          case NovaErrorCode.Unsupported:
            setError("This Nova operation is not supported here");
            break;
          default:
            setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { account, loading, error, connect, wallet };
}`}</code>
        </div>
        <p>Use the hook from a component:</p>
        <div className="code-block language-tsx">
          <code>{`import { useNovaWallet } from "./useNovaWallet";

export function ConnectButton() {
  const { account, loading, error, connect } = useNovaWallet();

  if (account) {
    const address = account.address.toString();
    return <span>Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>;
  }

  return (
    <button type="button" onClick={connect} disabled={loading}>
      {loading ? "Connecting..." : error || "Connect Nova"}
    </button>
  );
}`}</code>
        </div>
      </div>

      <div id="nova-connect-api-reference" className={`docs-section ${hash === "nova-connect-api-reference" ? "active" : ""}`}>
        <h1>Nova Connect - API Reference</h1>

        <h2>NovaWallet Class</h2>
        <p><code>NovaWallet</code> is the plugin-style adapter wrapper around <code>NovaClient</code>.</p>
        <div className="code-block language-tsx">
          <code>{`import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet(options);

await wallet.connect();
await wallet.account();
await wallet.disconnect();
await wallet.signMessage({ message: "...", nonce: "..." });
await wallet.signTransaction(walletStandardV11Input);
await wallet.signAndSubmitTransaction({ data: { /* payload */ } });
await wallet.signAndSubmitBCSTransaction({ data: { /* payload */ } });
await wallet.onAccountChange((account) => console.log(account));
await wallet.onNetworkChange((network) => console.log(network));

console.log(wallet.name);          // "Nova Connect"
console.log(wallet.url);           // desktop or mobile Nova website URL
console.log(wallet.icon);          // base64 SVG data URL
console.log(wallet.readyState);    // Installed | NotDetected | Loadable | Unsupported
console.log(wallet.connecting);    // boolean
console.log(wallet.connected);     // boolean
console.log(wallet.publicAccount); // cached address/public key metadata
console.log(wallet.network);       // cached network metadata
console.log(wallet.deeplinkProvider());`}</code>
        </div>

        <h2>NovaClient Class</h2>
        <p><code>NovaClient</code> owns provider detection, session reuse, bridge requests, relay requests, and signing.</p>
        <div className="code-block language-tsx">
          <code>{`import { NovaClient } from "@inferenco/nova-wallet-adapter";

const client = new NovaClient(options);

await client.connect();
await client.disconnect();
await client.getAccount();
await client.getNetwork();
await client.signMessage({ message: "...", nonce: "..." });
await client.signMessageAndVerify({ message: "...", nonce: "..." });
await client.signTransaction(walletStandardV11Input);
await client.signAndSubmitTransaction({ data: { /* payload */ } });
await client.signAndSubmitBCSTransaction({ data: { /* payload */ } });
await client.subscribe();

console.log(client.account);          // cached AccountInfo | null
console.log(client.cachedNetwork);    // cached NetworkInfo | null
console.log(client.refreshProvider()); // NovaProvider | undefined
console.log(client.hasProvider());     // boolean
console.log(client.hasExternalSession()); // boolean`}</code>
        </div>

        <h2>AIP-62 Functions</h2>
        <div className="code-block language-tsx">
          <code>{`import {
  createNovaAIP62Wallet,
  registerNovaWallet,
} from "@inferenco/nova-wallet-adapter/aip62";

const cedraWallet = createNovaAIP62Wallet();
registerNovaWallet({ forceRegistration: true });`}</code>
        </div>
        <p>The AIP-62 wallet implements these features:</p>
        <ul>
          <li><code>cedra:connect</code>, <code>cedra:disconnect</code>, <code>cedra:account</code>, and <code>cedra:network</code></li>
          <li><code>cedra:onAccountChange</code> and <code>cedra:onNetworkChange</code></li>
          <li><code>cedra:signMessage</code>, <code>cedra:signTransaction</code>, and <code>cedra:signAndSubmitTransaction</code></li>
          <li><code>cedra:openInMobileApp</code></li>
        </ul>
        <p>
          <code>registerNovaWallet()</code> prevents duplicate registration. It registers when a Nova provider exists,
          an external session exists, <code>forceRegistration</code> is true, a mobile browser is detected, or a desktop
          browser is detected while <code>desktopRegistration</code> is true.
        </p>

        <h2>Utilities</h2>
        <p>The main entry point also exports utilities for advanced integrations and troubleshooting.</p>
        <ul>
          <li><code>tryResumeNovaWalletConnection(walletCore, options?)</code> resumes pending mobile callback state for Cedra WalletCore users</li>
          <li><code>detectProvider(options?)</code> detects injected Nova providers and branded aliases</li>
          <li><code>remapNovaError(error)</code> throws a normalized <code>NovaAdapterError</code></li>
          <li><code>readExternalSession()</code>, <code>storeExternalSession()</code>, <code>clearExternalSession()</code>, and <code>readValidatedExternalSession()</code> manage stored sessions</li>
          <li><code>createKeyPair()</code>, <code>deriveSharedSecret()</code>, <code>encryptJson()</code>, and <code>decryptJson()</code> expose mobile relay crypto helpers</li>
          <li><code>connectViaMobileRelay()</code>, <code>resumeMobileRelaySessionFromCallback()</code>, and <code>watchRelaySocket()</code> support advanced relay flows</li>
        </ul>
      </div>

      <div id="nova-connect-configuration" className={`docs-section ${hash === "nova-connect-configuration" ? "active" : ""}`}>
        <h1>Nova Connect - Configuration</h1>
        <p>
          <code>NovaWallet</code>, <code>NovaClient</code>, <code>registerNovaWallet</code>, and
          <code> createNovaAIP62Wallet</code> accept <code>NovaWalletOptions</code>. Every field is optional.
        </p>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>deeplinkBaseUrl</code></td>
                <td>string</td>
                <td><code>"inferenco://connect?callback="</code></td>
                <td>Base URL used when generating Nova Wallet connect deeplinks.</td>
              </tr>
              <tr>
                <td><code>deeplinkScheme</code></td>
                <td>string</td>
                <td><code>"inferenco"</code></td>
                <td>URI scheme used by Nova deeplinks.</td>
              </tr>
              <tr>
                <td><code>websiteUrl</code></td>
                <td>string</td>
                <td><code>"https://inferenco.com/nova-desk"</code> on desktop, <code>"https://inferenco.com/nova-wallet"</code> on mobile</td>
                <td>Wallet website URL exposed in adapter metadata.</td>
              </tr>
              <tr>
                <td><code>forceRegistration</code></td>
                <td>boolean</td>
                <td><code>false</code></td>
                <td>Register the AIP-62 wallet even when no provider or stored session is detected.</td>
              </tr>
              <tr>
                <td><code>desktopRegistration</code></td>
                <td>boolean</td>
                <td><code>true</code></td>
                <td>Register on desktop browsers so users can connect through Nova Desk bridge or deeplink flows.</td>
              </tr>
              <tr>
                <td><code>detectAliases</code></td>
                <td>boolean</td>
                <td><code>true</code></td>
                <td>Check branded <code>window.cedra</code> and <code>window.aptos</code> providers after primary namespaces.</td>
              </tr>
              <tr>
                <td><code>networkOverride</code></td>
                <td>Network</td>
                <td><code>undefined</code></td>
                <td>Force a specific <code>Network</code> from <code>@cedra-labs/ts-sdk</code>.</td>
              </tr>
              <tr>
                <td><code>fullnodeUrl</code></td>
                <td>string</td>
                <td><code>undefined</code></td>
                <td>Use a custom Cedra fullnode URL for SDK transaction operations.</td>
              </tr>
              <tr>
                <td><code>bridgeBaseUrl</code></td>
                <td>string</td>
                <td><code>"http://127.0.0.1:21984"</code></td>
                <td>Base URL for the Nova Desk local HTTP bridge.</td>
              </tr>
              <tr>
                <td><code>relayBaseUrl</code></td>
                <td>string</td>
                <td><code>"https://nova-service-160604102004.europe-west1.run.app"</code></td>
                <td>Base URL for the Nova Wallet relay REST API.</td>
              </tr>
              <tr>
                <td><code>websocketBaseUrl</code></td>
                <td>string</td>
                <td><code>"wss://nova-service-160604102004.europe-west1.run.app/v1/ws"</code></td>
                <td>WebSocket URL for real-time mobile relay notifications.</td>
              </tr>
              <tr>
                <td><code>bridgeConnectTimeoutMs</code></td>
                <td>number</td>
                <td><code>1200</code></td>
                <td>Timeout for the initial Nova Desk bridge probe.</td>
              </tr>
              <tr>
                <td><code>bridgePollIntervalMs</code></td>
                <td>number</td>
                <td><code>250</code></td>
                <td>Polling interval while waiting for Nova Desk approval.</td>
              </tr>
              <tr>
                <td><code>bridgePollTimeoutMs</code></td>
                <td>number</td>
                <td><code>120000</code></td>
                <td>Total wait time for Nova Desk approval before timing out.</td>
              </tr>
              <tr>
                <td><code>mobilePollIntervalMs</code></td>
                <td>number</td>
                <td><code>1000</code></td>
                <td>HTTP polling interval while waiting for Nova Wallet approval.</td>
              </tr>
              <tr>
                <td><code>mobileRequestTimeoutMs</code></td>
                <td>number</td>
                <td><code>180000</code></td>
                <td>Total wait time for Nova Wallet approval before timing out.</td>
              </tr>
              <tr>
                <td><code>mobileSocketTimeoutMs</code></td>
                <td>number</td>
                <td><code>15000</code></td>
                <td>WebSocket wait time before falling back to HTTP polling.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Examples</h2>
        <div className="code-block language-tsx">
          <code>{`import { Network } from "@cedra-labs/ts-sdk";
import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet({
  networkOverride: Network.TESTNET,
  forceRegistration: true,
  fullnodeUrl: "https://fullnode.testnet.cedralabs.com/v1",
});`}</code>
        </div>
        <div className="code-block language-tsx">
          <code>{`const wallet = new NovaWallet({
  relayBaseUrl: "https://relay.your-domain.com",
  websocketBaseUrl: "wss://relay.your-domain.com/v1/ws",
  mobileRequestTimeoutMs: 240000,
});`}</code>
        </div>
      </div>

      <div id="nova-connect-mobile-relay" className={`docs-section ${hash === "nova-connect-mobile-relay" ? "active" : ""}`}>
        <h1>Nova Connect - Mobile Relay</h1>
        <p>
          Mobile browser connections use nova-service to broker encrypted communication between the dApp and
          Nova Wallet. The relay receives opaque ciphertext only.
        </p>
        <h2>Cryptographic Stack</h2>
        <ul>
          <li><strong>Key exchange:</strong> X25519 ECDH</li>
          <li><strong>Key derivation:</strong> HKDF-SHA256 with info <code>"nova-connect-relay"</code></li>
          <li><strong>Encryption:</strong> XChaCha20-Poly1305 AEAD</li>
          <li><strong>Nonce:</strong> 24 random bytes per message</li>
          <li><strong>Encoding:</strong> Base64url without padding</li>
        </ul>
        <h2>Flow</h2>
        <ol>
          <li>The dApp creates an X25519 keypair and posts the public key to <code>/v1/pairings</code>.</li>
          <li>The relay returns a pairing ID, dApp token, wallet deeplink, optional WebSocket URL, and expiry.</li>
          <li>The adapter opens the <code>inferenco://connect</code> deeplink so the user can approve in Nova Wallet.</li>
          <li>The dApp waits for approval through WebSocket first, then HTTP polling if the socket times out.</li>
          <li>The adapter derives the shared secret, decrypts the result, and stores the session for future requests.</li>
        </ol>
        <h2>Default Endpoints</h2>
        <div className="code-block language-text">
          <code>{`// Desktop Bridge (Nova Desk)
http://127.0.0.1:21984

// Mobile Relay REST (Nova Wallet)
https://nova-service-160604102004.europe-west1.run.app

// Mobile Relay WebSocket
wss://nova-service-160604102004.europe-west1.run.app/v1/ws

// Mobile deeplink
inferenco://connect?callback=<encoded-url>`}</code>
        </div>
        <h2>Advanced Relay Exports</h2>
        <ul>
          <li><code>createKeyPair()</code> creates a dApp X25519 keypair.</li>
          <li><code>deriveSharedSecret(privateKey, publicKey)</code> derives the relay encryption key.</li>
          <li><code>encryptJson(value, sharedSecret)</code> and <code>decryptJson(value, sharedSecret)</code> handle encrypted JSON envelopes.</li>
          <li><code>connectViaMobileRelay(options)</code> runs the mobile pairing flow.</li>
          <li><code>signMessageViaMobileRelay</code>, <code>signTransactionViaMobileRelay</code>, and <code>signAndSubmitViaMobileRelay</code> send encrypted signing requests.</li>
          <li><code>watchRelaySocket</code> listens for relay events before HTTP polling fallback.</li>
        </ul>
      </div>

      <div id="nova-connect-error-handling" className={`docs-section ${hash === "nova-connect-error-handling" ? "active" : ""}`}>
        <h1>Nova Connect - Error Handling</h1>
        <p>
          All adapter errors are normalized as <code>NovaAdapterError</code>. Enum keys are camel case,
          and each key maps to the uppercase string code shown below.
        </p>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Enum key</th>
                <th>String code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>UserRejected</code></td><td><code>USER_REJECTED</code></td><td>User rejected the request.</td></tr>
              <tr><td><code>Unauthorized</code></td><td><code>UNAUTHORIZED</code></td><td>Session expired or is not authorized.</td></tr>
              <tr><td><code>Unsupported</code></td><td><code>UNSUPPORTED</code></td><td>The requested operation or platform is unsupported.</td></tr>
              <tr><td><code>NotInstalled</code></td><td><code>NOT_INSTALLED</code></td><td>No provider, bridge, or usable session is available.</td></tr>
              <tr><td><code>ConnectionTimeout</code></td><td><code>CONNECTION_TIMEOUT</code></td><td>Connection or approval timed out.</td></tr>
              <tr><td><code>InvalidParams</code></td><td><code>INVALID_PARAMS</code></td><td>Invalid request parameters.</td></tr>
              <tr><td><code>InvalidNetwork</code></td><td><code>INVALID_NETWORK</code></td><td>Network value is invalid or unavailable.</td></tr>
              <tr><td><code>InternalError</code></td><td><code>INTERNAL_ERROR</code></td><td>Unexpected adapter or provider failure.</td></tr>
            </tbody>
          </table>
        </div>
        <div className="code-block language-tsx">
          <code>{`import {
  NovaAdapterError,
  NovaErrorCode,
  NovaWallet,
} from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();

try {
  await wallet.connect();
} catch (error) {
  if (error instanceof NovaAdapterError) {
    switch (error.code) {
      case NovaErrorCode.NotInstalled:
        console.log("Please install Nova Desk or Nova Wallet");
        break;
      case NovaErrorCode.UserRejected:
        console.log("User rejected the request");
        break;
      case NovaErrorCode.ConnectionTimeout:
        console.log("Connection timed out");
        break;
      case NovaErrorCode.Unsupported:
        console.log("Operation is not supported");
        break;
      default:
        console.log(error.message);
    }
  }
}`}</code>
        </div>
      </div>

      <div id="nova-connect-provider-detection" className={`docs-section ${hash === "nova-connect-provider-detection" ? "active" : ""}`}>
        <h1>Nova Connect - Provider Detection</h1>
        <p>The adapter detects injected providers in this order:</p>
        <ol>
          <li><code>window.inferenco</code></li>
          <li><code>window.nova</code></li>
          <li><code>window.cedra</code>, only when <code>isNovaWallet === true</code> and <code>detectAliases</code> is enabled</li>
          <li><code>window.aptos</code>, only when <code>isNovaWallet === true</code> and <code>detectAliases</code> is enabled</li>
        </ol>
        <div className="code-block language-tsx">
          <code>{`import { NovaWallet, detectProvider } from "@inferenco/nova-wallet-adapter";

const provider = detectProvider({ detectAliases: true });
const wallet = new NovaWallet({ detectAliases: false });

const available =
  wallet.readyState !== "NotDetected" &&
  wallet.readyState !== "Unsupported";

console.log(Boolean(provider), available);`}</code>
        </div>
        <p>Ready states:</p>
        <ul>
          <li><code>"Installed"</code> - provider, stored session, or desktop bridge/deeplink path is available</li>
          <li><code>"NotDetected"</code> - no mobile provider or session was detected</li>
          <li><code>"Loadable"</code> - enum value available for adapter consumers</li>
          <li><code>"Unsupported"</code> - running outside a browser environment</li>
        </ul>
      </div>

      <div id="nova-connect-session-management" className={`docs-section ${hash === "nova-connect-session-management" ? "active" : ""}`}>
        <h1>Nova Connect - Session Management</h1>
        <p>Nova Connect stores session data in browser storage so desktop and mobile flows survive reloads.</p>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Storage</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>inferenco:nova-session</code></td>
                <td><code>localStorage</code></td>
                <td>Active Nova Desk or Nova Wallet external session.</td>
              </tr>
              <tr>
                <td><code>inferenco:nova-protocol-key</code></td>
                <td><code>localStorage</code></td>
                <td>Protocol public key received during callback handling.</td>
              </tr>
              <tr>
                <td><code>inferenco:nova-pending-mobile-pairing</code></td>
                <td><code>localStorage</code></td>
                <td>Pending mobile pairing state used after deeplink reloads.</td>
              </tr>
              <tr>
                <td><code>inferenco:nova-callback-marker</code></td>
                <td><code>sessionStorage</code></td>
                <td>Callback request marker used to resume pending deeplink flows.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="code-block language-tsx">
          <code>{`import {
  clearExternalSession,
  clearPendingMobilePairing,
  readExternalSession,
  readValidatedExternalSession,
} from "@inferenco/nova-wallet-adapter";

const stored = readExternalSession();
const validated = await readValidatedExternalSession();

await wallet.disconnect(); // revokes active session and clears stored state
clearExternalSession();
clearPendingMobilePairing();`}</code>
        </div>
        <p>
          Nova Desk sessions are validated against the local bridge before reuse. Nova Wallet sessions store
          encrypted relay credentials and are reused by the relay transport. Cross-window updates are coordinated
          with storage events, window messaging, and <code>BroadcastChannel</code> when available.
        </p>
      </div>
    </>
  );
}
