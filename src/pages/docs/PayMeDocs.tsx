import receiveImage from "../../../assets/images/pay-me/pay-me-01-receive.webp";
import deskQrChoiceImage from "../../../assets/images/pay-me/pay-me-desk-qr-choice.webp";
import scanImage from "../../../assets/images/pay-me/pay-me-02-scan-pair.webp";
import confirmImage from "../../../assets/images/pay-me/pay-me-03-confirm-connection.webp";
import deskApprovalImage from "../../../assets/images/pay-me/pay-me-04-desk-ephemeral-approval.webp";
import amountImage from "../../../assets/images/pay-me/pay-me-05-enter-amount.webp";
import tokenImage from "../../../assets/images/pay-me/pay-me-06-choose-token.webp";
import reviewImage from "../../../assets/images/pay-me/pay-me-07-review.webp";
import emptyPairsImage from "../../../assets/images/pay-me/pay-me-08-reusable-empty.webp";
import connectedPairImage from "../../../assets/images/pay-me/pay-me-09-reusable-connected.webp";

const walkthrough = [
  {
    title: "Open Pay Me",
    copy: "In Infer Wallet, open Receive and choose Pay Me to see your paired merchants.",
    image: receiveImage,
    alt: "Infer Wallet Receive CEDRA screen with the Pay Me action; the receive QR is omitted",
    caption: "The Pay Me action sits above the receive QR.",
  },
  {
    title: "Generate the Desk QR",
    copy: "On Infer Desk, open Bridge, then Remote. Leave the permanent-pair checkbox clear for a short-lived ephemeral QR, or select it to issue a reusable pair QR. The operator can limit ephemeral signing requests at approval; a reusable pair remains subject to Desk policy and revocation.",
    image: deskQrChoiceImage,
    alt: "Infer Desk Bridge Remote screen with a non-scannable example QR and controls for ephemeral or permanent pairing",
    caption: "Choose the QR kind before scanning. This QR is illustrative and cannot be scanned; generate a fresh QR on Infer Desk. On a phone, swipe the image to see the controls.",
    desk: true,
  },
  {
    title: "Scan a Desk QR",
    copy: "Tap Add pair and scan the QR presented by Infer Desk. Check whether Desk issued a reusable or ephemeral QR.",
    image: scanImage,
    alt: "Infer Wallet Scan QR screen showing the reusable-merchant pairing explanation and Scan QR button",
    caption: "This phone capture describes a reusable merchant pair.",
  },
  {
    title: "Confirm on the phone",
    copy: "Review the connection prompt and tap Connect to continue.",
    image: confirmImage,
    alt: "Infer Wallet Connect to merchant confirmation with its short identifier redacted",
    caption: "The short connection identifier has been redacted.",
  },
  {
    title: "Approve on Infer Desk",
    copy: "For an ephemeral request, the Desk operator reviews the pending pair and chooses Approve or Reject.",
    image: deskApprovalImage,
    alt: "Infer Desk pending ephemeral pair request with Approve or Reject and the Nostr identifier redacted",
    caption: "Separate Desk example: an ephemeral request with its own expiry and shot budget. On a phone, swipe the image to see the approval control.",
    desk: true,
  },
  {
    title: "Enter an amount",
    copy: "Choose the requested amount. The destination is the phone's active wallet account.",
    image: amountImage,
    alt: "Infer Wallet Pay Me amount form with recipient address and token balance redacted",
    caption: "Review is disabled until a valid amount is entered.",
  },
  {
    title: "Choose a token",
    copy: "If needed, open the token selector and choose the asset for this request.",
    image: tokenImage,
    alt: "Infer Wallet Choose token sheet listing CEDRA and fungible assets with balances redacted",
    caption: "The example token list has its balances redacted.",
  },
  {
    title: "Review before signing",
    copy: "Verify the amount, source, destination, and token before Sign and Submit. Desk still applies its normal transaction approval.",
    image: reviewImage,
    alt: "Infer Wallet Review Pay Me screen showing five CEDRA and Sign and Submit with the address redacted",
    caption: "Illustrative 5 CEDRA review; this is not a completed transfer.",
  },
];

export default function PayMeDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="pay-me-introduction" className={`docs-section ${hash === "pay-me-introduction" ? "active" : ""}`}>
        <h1>Pay Me</h1>
        <p className="docs-lead">
          Pay Me lets Infer Wallet on mobile pair with Infer Desk over Nostr, then ask the desktop wallet
          to transfer a selected token amount to the phone's active account. Infer Desk can issue a
          reusable pair QR or a short-lived ephemeral pair QR.
        </p>

        <div className="info-box">
          <strong>Where to start:</strong> in Infer Wallet, open <strong>Receive</strong> and tap the
          <strong> Pay Me</strong> action. Its stable test identifier is <code>pay-me-receive-cta</code>.
        </div>

        <p>
          Pay Me uses the Bridge's <strong>Remote Nostr</strong> transport. It does not scan Local IPC or mTLS
          configuration, because Nostr is the only bridge-remote transport with a pairing QR.
        </p>
        <p>
          Pay Me is a first-party Infer Wallet feature. It has <strong>no
          {" "}<code>@inferenco/infer-wallet-adapter</code> surface</strong> — the adapter
          does not export it — so third-party dApps cannot integrate Pay Me directly.
        </p>
      </div>

      <div id="pay-me-flow" className={`docs-section ${hash === "pay-me-flow" ? "active" : ""}`}>
        <h1>How a Pay Me transfer works</h1>
        <p>
          The flow below describes an <strong>ephemeral</strong> pair. A reusable <code>pair</code> QR
          can leave the merchant in the phone's paired list across sessions, subject to Desk policy and
          revocation. Ephemeral TTL and signing-shot limits are distinct from reusable-pair policy.
        </p>
        <ol className="pay-me-flow">
          <li>
            <strong>Infer Desk creates a fresh QR.</strong> In the Bridge Remote tab, generate an ephemeral pairing QR.
            The <code>ephemeral_pair</code> payload includes <code>relay_hints</code>; Infer Wallet rejects an
            ephemeral QR without them.
          </li>
          <li>
            <strong>Infer Wallet scans and pairs.</strong> The phone discovers Infer Desk through ephemeral Nostr
            kind-20000 events, then completes pairing through a NIP-44 v2 encrypted direct message.
          </li>
          <li>
            <strong>The user chooses a token and amount.</strong> Infer Wallet builds a canonical Cedra entry
            function payload addressed to the phone's active account.
          </li>
          <li>
            <strong>Infer Desk reviews and submits.</strong> The phone sends one <code>SignAndSubmit</code> request.
            Infer Desk shows its normal approval review before signing and submitting.
          </li>
          <li>
            <strong>The phone tracks completion.</strong> Poll requests observe the transaction state, then the
            client disconnects. Polling and disconnect do not consume additional signing shots.
          </li>
          <li>
            <strong>Connect round-trip.</strong> The wallet sends a
            <code>connect</code> request and polls for confirmation before
            sending the signing request. This handshake confirms the merchant's
            identity and the ephemeral pair's session-scoped reachability
            before any on-chain action is requested.
          </li>
        </ol>

        <h2>Visual walkthrough</h2>
        <p>
          These edited, redacted illustrations show screens you may encounter, not one continuous session.
          The phone's scan example describes a reusable pair; the Desk approval example shows an
          <code> ephemeral_pair</code>. Follow the QR kind and policy shown by your own Desk.
        </p>
        <div className="pay-me-walkthrough">
          {walkthrough.map((step, index) => (
            <article
              className={`pay-me-step${step.desk ? " pay-me-step--desk" : ""}`}
              key={step.title}
            >
              <h3>
                <span className="pay-me-step-number" aria-hidden="true">{index + 1}</span>
                {step.title}
              </h3>
              <p>{step.copy}</p>
              <figure className="pay-me-figure">
                <img src={step.image} alt={step.alt} loading="lazy" />
                <figcaption>{step.caption}</figcaption>
              </figure>
            </article>
          ))}
        </div>

        <h2>QR kinds</h2>
        <p>
          Infer Desk generates three different QR kinds, picked by the
          operator based on the relationship with the payer:
        </p>
        <div className="functions-table">
          <table>
            <thead>
              <tr><th>QR kind</th><th>Purpose</th><th>Used for</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>ephemeral_pair</code></td>
                <td>One-shot customer payment</td>
                <td>Default customer flow. Single signing shot; auto-purges on TTL or budget.</td>
              </tr>
              <tr>
                <td><code>pair</code></td>
                <td>Reusable merchant pair</td>
                <td>Returning customer / regular payer. Persists across app restarts; the wallet reconnects without re-scanning.</td>
              </tr>
              <tr>
                <td><code>admin_pair</code></td>
                <td>Threshold / admin operations</td>
                <td>Operator-level requests requiring multi-sig. Rare for Pay Me.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>After the transfer</h2>
        <p>
          Once the desk signs and submits the transfer, the wallet shows a
          confirmation screen with three actions: <strong>Request again</strong>
          (same merchant — the active pair is kept and the amount is cleared
          for re-entry), <strong>Pair list</strong>
          (manage your reusable merchants), and <strong>Dashboard</strong>
          (back to the home screen).
        </p>

        <h2>Returning to a reusable merchant</h2>
        <p>
          A reusable <code>pair</code> can remain in the phone's merchant list across sessions until
          removed, revoked, or otherwise unavailable. This is not a promise about one-shot ephemeral
          pairs, which may disappear when their TTL or shot budget is exhausted.
        </p>
        <div className="pay-me-walkthrough pay-me-walkthrough--returning">
          <figure className="pay-me-figure">
            <img src={emptyPairsImage} alt="Infer Wallet paired merchants empty state with Add pair button" loading="lazy" />
            <figcaption>Before adding a reusable merchant, the list shows No pairs yet.</figcaption>
          </figure>
          <figure className="pay-me-figure">
            <img src={connectedPairImage} alt="Infer Wallet paired merchants list showing a connected reusable pair" loading="lazy" />
            <figcaption>After reusable pairing, select the merchant to request another payment.</figcaption>
          </figure>
        </div>

        <h2>Canonical transfer functions</h2>
        <table className="functions-table">
          <thead>
            <tr><th>Asset</th><th>Entry function</th><th>Important payload details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Asset">Native CEDRA</td>
              <td data-label="Entry function"><code>0x1::cedra_account::transfer</code></td>
              <td data-label="Payload">Recipient address followed by the integer amount in base units</td>
            </tr>
            <tr>
              <td data-label="Asset">Fungible asset token</td>
              <td data-label="Entry function"><code>0x1::primary_fungible_store::transfer</code></td>
              <td data-label="Payload">The metadata object is the first argument; the payload also preserves the required type arguments</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="pay-me-security" className={`docs-section ${hash === "pay-me-security" ? "active" : ""}`}>
        <h1>Pay Me security and recovery</h1>
        <ul>
          <li>
            <strong>One payment, one signing shot:</strong> the default ephemeral pair has a maximum of one shot,
            and the transfer's <code>sign_and_submit</code> request consumes it.
          </li>
          <li>
            <strong>Short-lived authority:</strong> the default paired lifetime is 600 seconds. The pair disappears
            when its lifetime expires or its shot budget reaches zero.
          </li>
          <li>
            <strong>Re-pair after a spent ephemeral shot:</strong> with the default one-shot policy,
            generate and scan a new ephemeral QR for the next payment. A spent or expired ephemeral pair
            is not silently renewed. A configured multi-shot ephemeral pair remains until its shot
            budget or TTL is exhausted; reusable pairs have separate lifetime and revocation rules.
          </li>
          <li>
            <strong>Discovery is not delivery:</strong> Nostr kind-20000 events are ephemeral and relays should not
            store them. The encrypted DM and poll loop carry the pair and transaction workflow.
          </li>
          <li>
            <strong>Relay visibility is limited:</strong> NIP-44 v2 encrypts direct-message contents, while NIP-01
            Schnorr signatures authenticate events. Relays may still delay, drop, or replay ciphertext.
          </li>
          <li>
            <strong>Desk policy still applies:</strong> pairing never bypasses Infer Desk's active-wallet allow-list,
            request review, threshold policy, or other configured controls.
          </li>
          <li>
            <strong>Two distinct TTLs.</strong> A Pay Me pair has both a QR
            validity window (<code>qrExpiresAtUnix</code>) and a post-approval
            session TTL (<code>ttlExpiresAtUnix</code>, derived from the desk's
            <code>ttl_secs</code>). The wallet's pair-store schema keeps them
            separate — the QR can expire while a previously-paired session is
            still active, and vice versa.
          </li>
          <li>
            <strong>Release builds enforce <code>wss://</code> relays only.</strong>{" "}
            <code>relayGuard.ts</code> strips cleartext <code>ws://</code> relay
            hints from QR payloads in production. LAN merchants continue to
            work; public cleartext relays do not.
          </li>
          <li>
            <strong>One pair per merchant, enforced server-side.</strong> If
            you try to pair a second time with a merchant that already has an
            active pair, Infer Desk replies with{" "}
            <code>merchant_already_paired</code> and Infer Wallet shows a
            dedicated toast directing you to the existing pair.
          </li>
          <li>
            <strong>Operators can disconnect at any time.</strong> The
            merchant's Infer Desk can sever the connection unilaterally. Infer
            Wallet collapses the active connection and surfaces the disconnect.
          </li>
          <li>
            <strong>Transaction state machine</strong> — submitted → pending →
            one of <em>confirmed</em>, <em>chain-failed</em>,{" "}
            <em>status-unknown</em>, or <em>awaiting-operator</em>. The last
            terminal state means the desk reported <code>not_paired</code> (the
            signing shot was consumed) and the merchant must re-authorize
            before retry.
          </li>
        </ul>

        <div className="info-box">
          <strong>Integrator note:</strong> Infer Wallet does not depend on <code>nostr-tools</code> for this flow.
          Its NIP-01, NIP-19, and NIP-44 implementation is built directly on the audited <code>@noble/*</code>
          primitives used by the mobile codebase.
        </div>
      </div>

      <div id="pay-me-managing-pairs" className={`docs-section ${hash === "pay-me-managing-pairs" ? "active" : ""}`}>
        <h1>Managing Pay Me pairs</h1>
        <p>
          Every <code>pair</code> (reusable) merchant pair lives in your
          wallet's encrypted pair store. Open <strong>Receive → Pay Me →
          Pair list</strong> to see them.
        </p>

        <h2>Per-row status</h2>
        <p>Each row shows a status indicator:</p>
        <ul>
          <li><strong>Connected</strong> — an active connection is live; ready for new transfers</li>
          <li><strong>Connecting</strong> — a connection open is in flight</li>
          <li><strong>Tap to connect</strong> — the pair is stored but no connection is open; tapping the row reconnects</li>
          <li><strong>Consumed</strong> — ephemeral pair used its single shot</li>
          <li><strong>Connection expired</strong> — the pair's TTL elapsed or the operator severed the connection</li>
        </ul>

        <h2>Pair list actions</h2>
        <ul>
          <li><strong>Rename</strong> — give a pair a friendly label (default = merchant pubkey).</li>
          <li><strong>Remove</strong> — permanently deletes the pair from the wallet. The merchant's desk will see the next request as a fresh pairing.</li>
          <li><strong>Disconnect</strong> — close the active connection without removing the pair; the next transfer reconnects.</li>
        </ul>
        <p>
          Expired ephemeral entries are pruned <strong>automatically</strong>{" "}
          every time the list renders — if any were removed, a brief toast
          shows the count.
        </p>

        <h2>Persistence across app restarts</h2>
        <p>
          Reusable pairs persist across app restarts. The full QR snapshot
          is stored in the pair store, so reconnecting does not require
          re-scanning. The single-use <code>ephemeral_pair</code> token, by
          contrast, is consumed on first use and cannot be re-used.
        </p>

        <h2>Token picker</h2>
        <p>
          The amount screen's token picker is a three-source merge:
        </p>
        <ul>
          <li><strong>Env defaults</strong> — the build-time configured token list (CEDRA in production).</li>
          <li><strong>On-chain balances</strong> — fungible assets (FAs) you actually hold, fetched from the chain.</li>
          <li><strong>User-added</strong> — any FA you add by address via "Add by address".</li>
        </ul>
        <p>
          If the requested FA is not in the wallet, the wallet surfaces a
          "missing-metadata" error and asks you to add it by address first.
        </p>
      </div>

      <div id="pay-me-scenarios" className={`docs-section ${hash === "pay-me-scenarios" ? "active" : ""}`}>
        <h1>Pay Me scenarios</h1>
        <div className="feature-grid">
          <article className="feature-card">
            <h2>Move funds to your phone</h2>
            <p>Withdraw an amount from Infer Desk to the active Infer Wallet account without copying an address.</p>
          </article>
          <article className="feature-card">
            <h2>Merchant request</h2>
            <p>Scan a fresh Desk QR or select an existing reusable merchant pair, then review the amount, recipient, and asset.</p>
          </article>
          <article className="feature-card">
            <h2>Quick one-off transfer</h2>
            <p>Use a short-lived, one-shot pair when persistent remote wallet authority would be unnecessary.</p>
          </article>
        </div>
      </div>
    </>
  );
}
