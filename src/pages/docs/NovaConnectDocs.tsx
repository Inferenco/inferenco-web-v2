export default function NovaConnectDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="nova-connect-introduction" className={`docs-section ${hash === "nova-connect-introduction" ? "active" : ""}`}>
        <h1>Nova Connect - Introduction</h1>
        <p>
          Nova Connect is the wallet adapter that enables Cedra dApps to connect with
          <strong> Nova Desk</strong> (desktop) and <strong>Nova Wallet</strong> (mobile).
          It provides deep integration with the Cedra Network blockchain through a simple,
          developer-friendly API.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Connect to Nova Desk via local bridge (<code>http://127.0.0.1:21984</code>)</li>
          <li>Connect to Nova Wallet via secure mobile relay</li>
          <li>Support for Cedra Network (primary) and Aptos (legacy)</li>
          <li>AIP-62 Wallet-Standard compatibility</li>
          <li>End-to-end encrypted mobile communication (X25519 + XChaCha20-Poly1305)</li>
          <li>Session persistence across page reloads</li>
          <li>TypeScript support with full type definitions</li>
          <li>Zero external dependencies for core functionality</li>
        </ul>
        <h3>Packages</h3>
        <ul>
          <li><code>@inferenco/nova-wallet-adapter</code> - Main wallet adapter package (v0.1.0)</li>
        </ul>
        <p>
          <strong>Note:</strong> There is no <code>@inferenco/nova-connect</code> package.
          The correct package name is <code>@inferenco/nova-wallet-adapter</code>.
        </p>
      </div>

      <div id="nova-connect-installation" className={`docs-section ${hash === "nova-connect-installation" ? "active" : ""}`}>
        <h1>Nova Connect - Installation</h1>
        <p>Install the Nova wallet adapter in your project:</p>
        <div className="code-block">
          <code>{`npm install @inferenco/nova-wallet-adapter`}</code>
        </div>
        <p>or with yarn:</p>
        <div className="code-block">
          <code>{`yarn add @inferenco/nova-wallet-adapter`}</code>
        </div>
        <p>or with pnpm:</p>
        <div className="code-block">
          <code>{`pnpm add @inferenco/nova-wallet-adapter`}</code>
        </div>
      </div>

      <div id="nova-connect-quickstart" className={`docs-section ${hash === "nova-connect-quickstart" ? "active" : ""}`}>
        <h1>Nova Connect - Quick Start</h1>
        <p>Get started with Nova Connect in minutes. Choose from three integration methods:</p>
        <h2>Method 1: AIP-62 Wallet-Standard (Recommended)</h2>
        <p>The simplest integration. Auto-registers Nova Connect as a standard Cedra wallet.</p>
        <div className="code-block">
          <code>{`import "@inferenco/nova-wallet-adapter/auto-register";
import { getCedraWallets, connect } from "@cedra-labs/wallet-standard";

const wallets = getCedraWallets();
await connect("Nova Connect");
const account = await wallets.find(w => w.name === "Nova Connect")?.account();`}</code>
        </div>

        <h2>Method 2: Plugin-Style Adapter</h2>
        <p>For dApps using plugin-style wallet consumers. Provides direct control over the adapter.</p>
        <div className="code-block">
          <code>{`import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();
await wallet.connect();
const account = await wallet.account();

// Sign a message
await wallet.signMessage({ message: "Hello", nonce: "123" });

// Sign and submit transaction
await wallet.signAndSubmitTransaction({
  data: { function: "0x1::coin::transfer", typeArguments: ["0x1::cedra_coin::CedraCoin"], functionArguments: ["0xrecipient", 100] }
});

// Disconnect
await wallet.disconnect();`}</code>
        </div>

        <h2>Method 3: Direct NovaClient</h2>
        <p>For advanced control over the connection lifecycle.</p>
        <div className="code-block">
          <code>{`import { NovaClient } from "@inferenco/nova-wallet-adapter";

const client = new NovaClient({ networkOverride: "devnet" });
const { account, network } = await client.connect();
const signed = await client.signMessage({ message: "...", nonce: "..." });
await client.disconnect();`}</code>
        </div>
      </div>

      <div id="nova-connect-react-integration" className={`docs-section ${hash === "nova-connect-react-integration" ? "active" : ""}`}>
        <h1>Nova Connect - React Integration</h1>
        <p>For React applications, use the Plugin-Style Adapter with React hooks:</p>
        <div className="code-block">
          <code>{`import { useState, useEffect } from 'react';
import { NovaWallet, NovaAdapterError, NovaErrorCode } from "@inferenco/nova-wallet-adapter";

// Create a single wallet instance
const wallet = new NovaWallet();

export function useNovaWallet() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check existing connection on mount
  useEffect(() => {
    wallet.account().then(acc => acc && setAccount(acc)).catch(() => {});
  }, []);

  const connect = async () => {
    setLoading(true);
    setError(null);
    try {
      const acc = await wallet.connect();
      setAccount(acc);
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
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { account, loading, error, connect };
}`}</code>
        </div>
        <p>Usage in a component:</p>
        <div className="code-block">
          <code>{`import { useNovaWallet } from './useNovaWallet';

function ConnectButton() {
  const { account, loading, error, connect } = useNovaWallet();
  
  if (account) {
    return "Connected: " + account.address?.toString().slice(0, 6) + "..." + account.address?.toString().slice(-4);
  }
  
  return loading ? "Connecting..." : error || "Connect Nova";
}`}</code>
        </div>
        <p>For TypeScript/JSX usage in React components:</p>
        <div className="code-block">
          <code>{`import { useState } from 'react';
import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();

export function ConnectButton() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const acc = await wallet.connect();
      setAccount(acc);
    } finally {
      setLoading(false);
    }
  };

  if (account) {
    return <div>Connected: {String(account.address).slice(0, 6)}...{String(account.address).slice(-4)}</div>;
  }

  return <button onClick={handleConnect} disabled={loading}>
    {loading ? 'Connecting...' : 'Connect Nova'}
  </button>;
}`}</code>
        </div>
        <p>For transaction signing:</p>
        <div className="code-block">
          <code>{`import { useState } from 'react';
import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();

export function SendCedraButton({ recipient, amount }) {
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const result = await wallet.signAndSubmitTransaction({
        data: {
          function: "0x1::coin::transfer",
          typeArguments: ["0x1::cedra_coin::CedraCoin"],
          functionArguments: [recipient, amount],
        },
      });
      setHash(result.hash);
    } finally {
      setLoading(false);
    }
  };

  return <button onClick={handleSend} disabled={loading || !recipient}>
    {loading ? 'Sending...' : 'Send CEDRA'}
    {hash && <div>TX: {hash}</div>}
  </button>;
}`}</code>
        </div>
      </div>

      <div id="nova-connect-api-reference" className={`docs-section ${hash === "nova-connect-api-reference" ? "active" : ""}`}>
        <h1>Nova Connect - API Reference</h1>
        <h2>NovaWallet Class</h2>
        <p>Main class for plugin-style integration.</p>
        <div className="code-block">
          <code>{`import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet({ 
  bridgeBaseUrl: "http://127.0.0.1:21984",
  relayBaseUrl: "https://nova-service-160604102004.europe-west1.run.app",
});

// Methods
await wallet.connect();
await wallet.account();
await wallet.disconnect();
await wallet.signMessage({ message: "...", nonce: "..." });
await wallet.signAndSubmitTransaction({ data: { /* payload */ } });

// Events
await wallet.onAccountChange(acc => console.log(acc));
await wallet.onNetworkChange(net => console.log(net));

// Properties
console.log(wallet.name);        // "Nova Connect"
console.log(wallet.readyState);  // "Installed" | "NotDetected" | "Loadable" | "Unsupported"
console.log(wallet.connected);   // boolean`}</code>
        </div>
        <h2>NovaClient Class</h2>
        <p>Advanced class for direct control.</p>
        <div className="code-block">
          <code>{`import { NovaClient } from "@inferenco/nova-wallet-adapter";

const client = new NovaClient();
await client.connect();
const account = await client.getAccount();
const network = await client.getNetwork();
await client.signMessage({ message: "...", nonce: "..." });
await client.signAndSubmitTransaction({ data: { /* payload */ } });
console.log(client.hasProvider());     // boolean
console.log(client.hasExternalSession()); // boolean`}</code>
        </div>
        <h2>AIP-62 Functions</h2>
        <div className="code-block">
          <code>{`import { registerNovaWallet } from "@inferenco/nova-wallet-adapter/aip62";

// Manual registration
registerNovaWallet({ forceRegistration: true });

// Or use auto-register (side-effect import)
import "@inferenco/nova-wallet-adapter/auto-register";`}</code>
        </div>
      </div>

      <div id="nova-connect-configuration" className={`docs-section ${hash === "nova-connect-configuration" ? "active" : ""}`}>
        <h1>Nova Connect - Configuration</h1>
        <p>All options are optional with sensible defaults:</p>
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
                <td>Mobile deeplink base URL</td>
              </tr>
              <tr>
                <td><code>deeplinkScheme</code></td>
                <td>string</td>
                <td><code>"inferenco"</code></td>
                <td>Mobile deeplink scheme</td>
              </tr>
              <tr>
                <td><code>websiteUrl</code></td>
                <td>string</td>
                <td><code>"https://inferenco.com"</code></td>
                <td>Your application URL</td>
              </tr>
              <tr>
                <td><code>networkOverride</code></td>
                <td>Network</td>
                <td>-</td>
                <td>Force specific network</td>
              </tr>
              <tr>
                <td><code>bridgeBaseUrl</code></td>
                <td>string</td>
                <td><code>"http://127.0.0.1:21984"</code></td>
                <td>Nova Desk bridge URL</td>
              </tr>
              <tr>
                <td><code>relayBaseUrl</code></td>
                <td>string</td>
                <td><code>"https://nova-service-160604102004.europe-west1.run.app"</code></td>
                <td>Nova Wallet relay URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="nova-connect-mobile-relay" className={`docs-section ${hash === "nova-connect-mobile-relay" ? "active" : ""}`}>
        <h1>Nova Connect - Mobile Relay</h1>
        <p>Mobile connections use end-to-end encryption with:</p>
        <ul>
          <li><strong>Key Exchange:</strong> X25519 ECDH</li>
          <li><strong>Key Derivation:</strong> HKDF-SHA256</li>
          <li><strong>Encryption:</strong> XChaCha20-Poly1305</li>
        </ul>
        <h2>Default Endpoints</h2>
        <div className="code-block">
          <code>{`// Desktop Bridge
http://127.0.0.1:21984

// Mobile Relay HTTP
https://nova-service-160604102004.europe-west1.run.app

// Mobile Relay WebSocket
wss://nova-service-160604102004.europe-west1.run.app/v1/ws`}</code>
        </div>
      </div>

      <div id="nova-connect-error-handling" className={`docs-section ${hash === "nova-connect-error-handling" ? "active" : ""}`}>
        <h1>Nova Connect - Error Handling</h1>
        <p>All errors extend <code>NovaAdapterError</code> with typed codes:</p>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>USER_REJECTED</code></td><td>User rejected the request</td></tr>
              <tr><td><code>UNAUTHORIZED</code></td><td>Session expired or invalid</td></tr>
              <tr><td><code>NOT_INSTALLED</code></td><td>Nova not installed</td></tr>
              <tr><td><code>CONNECTION_TIMEOUT</code></td><td>Connection timed out</td></tr>
              <tr><td><code>INVALID_PARAMS</code></td><td>Invalid parameters</td></tr>
              <tr><td><code>INVALID_NETWORK</code></td><td>Network mismatch</td></tr>
              <tr><td><code>INTERNAL_ERROR</code></td><td>Internal error</td></tr>
            </tbody>
          </table>
        </div>
        <div className="code-block">
          <code>{`import { NovaWallet, NovaAdapterError, NovaErrorCode } from "@inferenco/nova-wallet-adapter";

try {
  await wallet.connect();
} catch (error) {
  if (error instanceof NovaAdapterError) {
    switch (error.code) {
      case NovaErrorCode.NotInstalled:
        console.log("Please install Nova Desk or Nova Wallet");
        break;
      case NovaErrorCode.UserRejected:
        console.log("User rejected");
        break;
      case NovaErrorCode.ConnectionTimeout:
        console.log("Connection timed out");
        break;
    }
  }
}`}</code>
        </div>
      </div>

      <div id="nova-connect-provider-detection" className={`docs-section ${hash === "nova-connect-provider-detection" ? "active" : ""}`}>
        <h1>Nova Connect - Provider Detection</h1>
        <p>Detect if Nova is available in the browser:</p>
        <div className="code-block">
          <code>{`import { NovaWallet, detectProvider } from "@inferenco/nova-wallet-adapter";

// Method 1: Using NovaWallet readyState
const wallet = new NovaWallet();
const isAvailable = wallet.readyState !== "NotDetected" && wallet.readyState !== "Unsupported";

// Method 2: Direct detection
const provider = detectProvider();
if (provider) {
  console.log("Nova provider detected");
}

// Check specific namespaces
const hasInferenco = typeof window !== 'undefined' && !!window.inferenco;
const hasNova = typeof window !== 'undefined' && !!window.nova;`}</code>
        </div>
        <p>Ready states:</p>
        <ul>
          <li><code>"Installed"</code> - Provider detected or session exists</li>
          <li><code>"NotDetected"</code> - No provider, no session</li>
          <li><code>"Loadable"</code> - Can be loaded</li>
          <li><code>"Unsupported"</code> - Not in browser environment</li>
        </ul>
      </div>

      <div id="nova-connect-session-management" className={`docs-section ${hash === "nova-connect-session-management" ? "active" : ""}`}>
        <h1>Nova Connect - Session Management</h1>
        <p>Sessions persist across page reloads using localStorage:</p>
        <div className="code-block">
          <code>{`// Session storage keys
"inferenco:nova-session"           // External session data
"inferenco:nova-protocol-key"     // Protocol public key
"inferenco:nova-pending-mobile-pairing" // Pending mobile pairing

// Clear session manually
await wallet.disconnect();

// Or clear all storage
localStorage.removeItem("inferenco:nova-session");
localStorage.removeItem("inferenco:nova-protocol-key");
localStorage.removeItem("inferenco:nova-pending-mobile-pairing");

// Resume from existing session
try {
  const account = await wallet.account();
  console.log("Resumed session:", account.address);
} catch {
  // No active session
}`}</code>
        </div>
        <p>Cross-tab synchronization is supported automatically.</p>
      </div>

      <div id="nova-connect-mobile-relay" className={`docs-section ${hash === "nova-connect-mobile-relay" ? "active" : ""}`}>
        <h1>Nova Connect - Mobile Relay</h1>
        <p>Mobile connections use end-to-end encryption with:</p>
        <ul>
          <li><strong>Key Exchange:</strong> X25519 ECDH</li>
          <li><strong>Key Derivation:</strong> HKDF-SHA256 with info="nova-connect-relay"</li>
          <li><strong>Encryption:</strong> XChaCha20-Poly1305 (AEAD)</li>
          <li><strong>Nonce:</strong> 24 random bytes per message</li>
          <li><strong>Encoding:</strong> Base64url (RFC 4648)</li>
        </ul>
        <h2>Security Properties</h2>
        <ul>
          <li><strong>Forward Secrecy:</strong> Ephemeral keys per pairing</li>
          <li><strong>Confidentiality:</strong> All payloads encrypted</li>
          <li><strong>Integrity:</strong> Poly1305 authentication</li>
          <li><strong>Replay Protection:</strong> Unique nonces per message</li>
          <li><strong>Server Untrusted:</strong> Relay cannot decrypt payloads</li>
        </ul>
        <h2>Default Relay Endpoints</h2>
        <div className="code-block">
          <code>{`// Desktop Bridge (Nova Desk)
http://127.0.0.1:21984

// Mobile Relay (Nova Wallet)
HTTP:  https://nova-service-160604102004.europe-west1.run.app
WebSocket: wss://nova-service-160604102004.europe-west1.run.app/v1/ws

// Mobile deeplink format
inferenco://connect?callback=<encoded-url>
myapp://connect?callback=<encoded-url> // with custom scheme`}</code>
        </div>
      </div>
    </>
  );
}
