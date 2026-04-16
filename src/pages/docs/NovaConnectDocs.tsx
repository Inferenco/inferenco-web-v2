export default function NovaConnectDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="nova-connect-introduction" className={`docs-section ${hash === "nova-connect-introduction" ? "active" : ""}`}>
        <h1>Nova Connect - Introduction</h1>
        <p>
          Nova Connect is a React library for building Web3 applications that interact
          with Nova services. It provides a simple interface for wallet connections,
          AI inference, and blockchain interactions.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Easy wallet connection (Nova Wallet, MetaMask, etc.)</li>
          <li>Seamless AI inference integration</li>
          <li>TypeScript support out of the box</li>
          <li>Modular and tree-shakeable</li>
        </ul>
        <h3>Packages</h3>
        <ul>
          <li><code>@inferenco/nova-connect</code> - Main package</li>
          <li><code>@inferenco/nova-wallet-adapter</code> - Nova Wallet integration</li>
        </ul>
      </div>

      <div id="nova-connect-installation" className={`docs-section ${hash === "nova-connect-installation" ? "active" : ""}`}>
        <h1>Nova Connect - Installation</h1>
        <p>Install Nova Connect in your project:</p>
        <div className="code-block">
          <code>{`npm install @inferenco/nova-connect
# or
pnpm add @inferenco/nova-connect`}</code>
        </div>
        <h3>Peer Dependencies</h3>
        <p>Make sure you have React 18+ installed:</p>
        <div className="code-block">
          <code>{`npm install react react-dom`}</code>
        </div>
      </div>

      <div id="nova-connect-quickstart" className={`docs-section ${hash === "nova-connect-quickstart" ? "active" : ""}`}>
        <h1>Nova Connect - Quick Start</h1>
        <p>Get started with Nova Connect in minutes:</p>
        <ol className="step-list">
          <li>Install the package</li>
          <li>Wrap your app with NovaProvider</li>
          <li>Use the connect button component</li>
        </ol>
        <div className="code-block">
          <code>{`import { NovaProvider, NovaConnectButton } from '@inferenco/nova-connect';

function App() {
  return (
    <NovaProvider apiKey="your_api_key">
      <NovaConnectButton />
    </NovaProvider>
  );
}`}</code>
        </div>
      </div>

      <div id="nova-connect-api-reference" className={`docs-section ${hash === "nova-connect-api-reference" ? "active" : ""}`}>
        <h1>Nova Connect - API Reference</h1>
        <h2>Components</h2>
        <h3>NovaProvider</h3>
        <p>Root provider component that sets up the Nova context.</p>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>apiKey</code></td>
                <td>string</td>
                <td>Yes</td>
                <td>Your Nova API key</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td>ReactNode</td>
                <td>Yes</td>
                <td>Child components</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>NovaConnectButton</h3>
        <p>Button component for wallet connection.</p>
      </div>

      <div id="nova-connect-mobile-relay" className={`docs-section ${hash === "nova-connect-mobile-relay" ? "active" : ""}`}>
        <h1>Nova Connect - Mobile Relay</h1>
        <p>
          Nova Connect supports mobile wallet connections through the Nova Wallet
          mobile app using a relay server for secure communication.
        </p>
        <h3>How It Works</h3>
        <ol className="step-list">
          <li>User scans QR code with Nova Wallet</li>
          <li>Connection is established via secure relay</li>
          <li>Transactions are signed on mobile device</li>
          <li>Results returned to web application</li>
        </ol>
        <h3>Configuration</h3>
        <div className="code-block">
          <code>{`const config = {
  relayServer: 'wss://relay.novawallet.inferenco.com',
  mobileWallet: {
    name: 'Nova Wallet',
    icon: '...',
    getUniversalLink: (uri) => \`novawallet://connect?uri=\${uri}\`,
  },
};`}</code>
        </div>
      </div>

      <div id="nova-connect-configuration" className={`docs-section ${hash === "nova-connect-configuration" ? "active" : ""}`}>
        <h1>Nova Connect - Configuration</h1>
        <p>Configure Nova Connect for your application:</p>
        <h3>Configuration Options</h3>
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
                <td><code>apiKey</code></td>
                <td>string</td>
                <td>-</td>
                <td>Your Nova API key (required)</td>
              </tr>
              <tr>
                <td><code>chainId</code></td>
                <td>number</td>
                <td>1</td>
                <td>Blockchain network ID</td>
              </tr>
              <tr>
                <td><code>relayServer</code></td>
                <td>string</td>
                <td>wss://relay...</td>
                <td>Mobile relay server URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
