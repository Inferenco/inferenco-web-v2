export default function PayMeDocs({ hash }: { hash: string }) {
  return (
    <>
      <div id="pay-me-introduction" className={`docs-section ${hash === "pay-me-introduction" ? "active" : ""}`}>
        <h1>Pay Me</h1>
        <p className="docs-lead">
          Pay Me lets Infer Wallet on mobile scan an ephemeral Nostr pairing QR from Infer Desk, then ask the
          desktop wallet to transfer a selected token amount to the phone's active account.
        </p>

        <div className="info-box">
          <strong>Where to start:</strong> in Infer Wallet, open <strong>Receive</strong> and tap the
          <strong> Pay Me</strong> action. Its stable test identifier is <code>pay-me-receive-cta</code>.
        </div>

        <p>
          Pay Me uses the Bridge's <strong>Remote Nostr</strong> transport. It does not scan Local IPC or mTLS
          configuration, because Nostr is the only bridge-remote transport with a pairing QR.
        </p>
      </div>

      <div id="pay-me-flow" className={`docs-section ${hash === "pay-me-flow" ? "active" : ""}`}>
        <h1>How a Pay Me transfer works</h1>
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
        </ol>

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
            <strong>Re-pair for the next payment:</strong> generate and scan a new ephemeral QR for each payment
            cycle. A spent or expired pair is not silently renewed.
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
        </ul>

        <div className="info-box">
          <strong>Integrator note:</strong> Infer Wallet does not depend on <code>nostr-tools</code> for this flow.
          Its NIP-01, NIP-19, and NIP-44 implementation is built directly on the audited <code>@noble/*</code>
          primitives used by the mobile codebase.
        </div>
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
            <p>Scan a fresh desk QR, enter the agreed amount, and review the recipient and asset before approval.</p>
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
