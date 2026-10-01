import type { ReactNode } from "react";
import overviewImage from "../../../assets/images/bridge/bridge-step-01-overview.png";
import localIpcImage from "../../../assets/images/bridge/bridge-step-02-local-ipc.png";
import mtlsListenerImage from "../../../assets/images/bridge/bridge-step-03-mtls-listener.png";
import spkiImage from "../../../assets/images/bridge/bridge-step-04-copy-spki-pin.png";
import nostrRelaysImage from "../../../assets/images/bridge/bridge-step-05-nostr-relays.png";
import pairingQrImage from "../../../assets/images/bridge/bridge-step-06-ephemeral-pairing.png";
import enableNostrImage from "../../../assets/images/bridge/bridge-step-07-enable-nostr.png";
import pairedAppsImage from "../../../assets/images/bridge/bridge-step-08-manage-paired-apps.png";

type SetupStepProps = {
  number: number;
  title: string;
  children: ReactNode;
  image: string;
  alt: string;
  caption: string;
};

function SetupStep({ number, title, children, image, alt, caption }: SetupStepProps) {
  return (
    <article className="bridge-step">
      <div className="bridge-step-heading">
        <span className="bridge-step-number" aria-hidden="true">{number}</span>
        <h2>{title}</h2>
      </div>
      <div className="bridge-step-copy">{children}</div>
      <figure className="bridge-figure">
        <img src={image} alt={alt} loading="lazy" />
        <figcaption>{caption}</figcaption>
      </figure>
    </article>
  );
}

export default function BridgeDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="bridge-introduction" className={`docs-section ${hash === "bridge-introduction" ? "active" : ""}`}>
        <h1>Infer Desk Bridge</h1>
        <p className="docs-lead">
          The Bridge lets approved third-party applications request wallet connections, signatures, submissions,
          session management, and revocation from Infer Desk without exposing wallet keys.
        </p>

        <div className="info-box bridge-distinction">
          <strong>Built-in browser or Bridge?</strong>
          <p>
            A dApp running inside Infer Desk's built-in browser uses the Expert-Safe-Protocol HTTP interface.
            It does <strong>not</strong> use the native Bridge described here.
          </p>
        </div>

        <h2>Supported requests</h2>
        <div className="bridge-operation-list" aria-label="Supported Bridge requests">
          {[
            "connect",
            "sign_message",
            "sign_transaction",
            "sign_and_submit",
            "disconnect",
            "revoke_session",
            "list_sessions",
          ].map((operation) => <code key={operation}>{operation}</code>)}
        </div>
        <p>
          Every signing request still reaches Infer Desk's approval and policy layer. A transport connection is not
          permission to sign automatically.
        </p>
      </div>

      <div id="bridge-transport-choice" className={`docs-section ${hash === "bridge-transport-choice" ? "active" : ""}`}>
        <h1>Choose a Bridge transport</h1>
        <p>Choose the narrowest transport that fits where the consumer runs.</p>

        <table className="functions-table bridge-transport-table">
          <thead>
            <tr><th>Transport</th><th>What it is</th><th>Authentication</th><th>Use it when</th></tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Transport"><strong>Local IPC</strong></td>
              <td data-label="What it is">Unix domain socket or Windows named pipe; no network listener</td>
              <td data-label="Authentication">Operating-system peer credentials, including <code>SO_PEERCRED</code> on Unix</td>
              <td data-label="Use it when">The consumer runs on the same machine</td>
            </tr>
            <tr>
              <td data-label="Transport"><strong>Remote mTLS</strong></td>
              <td data-label="What it is">Mutual TLS over TCP; loopback defaults to <code>127.0.0.1:21985</code></td>
              <td data-label="Authentication">Client certificate validation, wallet-server SPKI pinning, and wallet-address allow-list</td>
              <td data-label="Use it when">A different host needs a persistent integration such as MCP or CLI automation</td>
            </tr>
            <tr>
              <td data-label="Transport"><strong>Remote Nostr</strong></td>
              <td data-label="What it is">NIP-44 v2 encrypted direct messages over outbound WebSocket relays</td>
              <td data-label="Authentication">Paired-npub allow-list with NIP-01 Schnorr-verified events</td>
              <td data-label="Use it when">A mobile or ephemeral client cannot accept inbound connections</td>
            </tr>
          </tbody>
        </table>

        <div className="info-box">
          <strong>Rule of thumb:</strong> same host: Local IPC; persistent cross-host integration: mTLS;
          mobile, ephemeral, or firewall-restricted integration: Nostr.
        </div>
      </div>

      <div id="bridge-setup" className={`docs-section ${hash === "bridge-setup" ? "active" : ""}`}>
        <h1>Set up the Bridge</h1>
        <p>These controls are off by default. Enable only the transports an integration actually needs.</p>

        <SetupStep
          number={1}
          title="Open Settings -> Bridge"
          image={overviewImage}
          alt="Infer Desk Bridge overview with the Bridge navigation item circled in red"
          caption="The LAN tab summarizes Local IPC and mTLS listener state."
        >
          <p>Unlock Infer Desk, open <strong>Bridge</strong> in the left navigation, and confirm the active account before configuring access.</p>
        </SetupStep>

        <SetupStep
          number={2}
          title="Enable Local IPC for same-machine apps"
          image={localIpcImage}
          alt="Local IPC settings with the Allow Local IPC connections checkbox circled in red"
          caption="Local IPC uses a Unix socket or Windows named pipe and does not create a network listener."
        >
          <p>Turn on <strong>Allow Local IPC connections</strong> only when a trusted local tool needs wallet access, then save.</p>
        </SetupStep>

        <SetupStep
          number={3}
          title="Configure and enable the mTLS listener"
          image={mtlsListenerImage}
          alt="mTLS configuration with the Enable mTLS bridge listener checkbox circled in red"
          caption="Loopback is the safe default; non-loopback binds require an explicit opt-in and mutual TLS."
        >
          <p>
            Keep <code>127.0.0.1:21985</code> unless cross-host access is required. Add every wallet address the
            remote app may act on - the empty allow-list denies signing requests - then enable the listener and apply.
          </p>
        </SetupStep>

        <SetupStep
          number={4}
          title="Pin the wallet server identity"
          image={spkiImage}
          alt="mTLS certificate identity with the Copy SPKI pin button circled in red"
          caption="The consumer pins this SPKI value to verify that it reached the intended Infer Desk wallet."
        >
          <p>
            Copy the SPKI pin into the remote consumer configuration. When a client CA is configured, Infer Desk
            also validates the consumer's client certificate before applying wallet policy.
          </p>
        </SetupStep>

        <SetupStep
          number={5}
          title="Configure Nostr relays and policy"
          image={nostrRelaysImage}
          alt="Remote Nostr settings with the relay URL field circled in red"
          caption="The default production relay is wss://nostr.inferenco.com; Nostr remains disabled until explicitly enabled."
        >
          <p>
            Use TLS relays, enter the wallet-address allow-list, and review rate, age, inactivity, and threshold
            controls. Relays transport ciphertext; they do not receive plaintext requests.
          </p>
        </SetupStep>

        <SetupStep
          number={6}
          title="Generate an ephemeral pairing QR"
          image={pairingQrImage}
          alt="Remote pairing controls with Generate Ephemeral Pairing QR circled in red"
          caption="Ephemeral pairing is the default for one-payment and one-shot clients."
        >
          <p>
            Generate a fresh QR and scan it from the client. The token is single-use and process-local. The default
            ephemeral pair has one signing shot and a 600-second lifetime after pairing.
          </p>
        </SetupStep>

        <SetupStep
          number={7}
          title="Enable the Nostr listener"
          image={enableNostrImage}
          alt="Remote Nostr settings with the Allow Nostr bridge checkbox circled in red"
          caption="Enabling Nostr subscribes to the configured relays and accepts encrypted DMs only from paired apps."
        >
          <p>Check <strong>Allow Nostr bridge</strong> and apply after the relay and allow-list policy is complete.</p>
        </SetupStep>

        <SetupStep
          number={8}
          title="Review and revoke paired apps"
          image={pairedAppsImage}
          alt="All paired apps view with the Revoke controls circled in red"
          caption="The unified view shows persistent mTLS and Nostr pairs, live ephemeral pairs, and recent activity."
        >
          <p>Use <strong>Revoke</strong> immediately for an unknown or retired integration and review the activity log for unexpected requests.</p>
        </SetupStep>
      </div>

      <div id="bridge-security" className={`docs-section ${hash === "bridge-security" ? "active" : ""}`}>
        <h1>Bridge security model</h1>
        <ul>
          <li><strong>Deny by default:</strong> mTLS and Nostr signing requests fail when the active-wallet allow-list is empty.</li>
          <li><strong>Keep network exposure narrow:</strong> IPC has no network surface, and mTLS binds to loopback by default.</li>
          <li><strong>Layer identity and policy:</strong> transport authentication is checked before wallet-address, time, spending, and threshold policy.</li>
          <li><strong>Keep approvals human-visible:</strong> pairing does not bypass Infer Desk's signing review.</li>
          <li><strong>Treat relays as untrusted delivery infrastructure:</strong> a relay can delay, drop, or replay traffic, but NIP-44 v2 protects DM contents and signatures bind the sender.</li>
          <li><strong>Budget ephemeral authority:</strong> <code>sign_message</code>, <code>sign_transaction</code>, <code>sign_and_submit</code>, <code>revoke_session</code>, and Nostr wallet-key rotation consume a shot; connection, polling, disconnect, health, and read-only calls do not.</li>
          <li><strong>Use discovery only for discovery:</strong> Nostr kind-20000 pairing events are ephemeral and should not be stored by relays; encrypted DMs carry the actual pair and request flow.</li>
        </ul>
      </div>

      <div id="bridge-wallet-client" className={`docs-section ${hash === "bridge-wallet-client" ? "active" : ""}`}>
        <h1>Bridge wallet client</h1>
        <p>
          A Bridge <em>wallet client</em> is any application that
          initiates requests against Infer Desk through one of the three
          transports. The flagship wallet client today is{" "}
          <a href="/docs#pay-me-introduction">Infer Wallet's Pay Me</a>{" "}
          flow.
        </p>

        <h2>Infer Wallet is a Nostr-only client</h2>
        <p>
          Infer Wallet can only consume the Bridge through the{" "}
          <strong>Remote Nostr</strong> transport. It does not implement
          Local IPC or mTLS, because:
        </p>
        <ul>
          <li>Local IPC is for native binaries on the same host — a phone has no IPC socket to talk to.</li>
          <li>mTLS requires a TCP port forward to the wallet's network — phones behind NAT cannot accept inbound connections.</li>
          <li>Nostr is the only transport that works through firewalls and across networks with no firewall holes.</li>
        </ul>
        <p>
          As a consequence, the Pay Me flow is always a Nostr pair — there
          is no "faster" path from the wallet to the desk.
        </p>

        <h2>Building a third-party Nostr wallet client</h2>
        <p>
          A third-party mobile (or desktop) Nostr Bridge client must
          implement:
        </p>
        <ol>
          <li>
            <strong>QR scan</strong> of a <code>cedra:</code> URI carrying a
            JSON <code>NostrQrPayload</code> (<code>qr_kind</code>,{" "}
            <code>wallet_npub</code>, token, <code>relay_hints</code>,
            expiry, ephemeral token).
          </li>
          <li>
            <strong>Kind-20000 discovery</strong> (ephemeral) or direct
            kind-4 DM (reusable) to the merchant's wallet_npub.
          </li>
          <li>
            <strong>NIP-44 v2 encryption</strong> of every DM payload
            (hand-rolled or via <code>@noble/ciphers</code>; there is no
            <code>nostr-tools</code> in this ecosystem).
          </li>
          <li>
            <strong><code>connect</code> + <code>pollConnect</code></strong>{" "}
            to confirm session-scoped reachability.
          </li>
          <li>
            <strong><code>signAndSubmit</code> +{" "}
            <code>pollSignAndSubmit</code></strong>{" "}
            carrying a canonical{" "}
            <code>0x1::cedra_account::transfer</code> or{" "}
            <code>0x1::primary_fungible_store::transfer</code> payload.
          </li>
          <li>
            <strong><code>Disconnect</code></strong> on user cancellation or
            pair expiry.
          </li>
        </ol>
        <p>
          See <a href="/docs#pay-me-introduction">Pay Me → Introduction</a>{" "}
          for the concrete walkthrough as implemented in Infer Wallet.
        </p>
      </div>
    </>
  );
}
