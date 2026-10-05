import type { DocsProps } from "./types";

export default function AuditDocs({ hash }: DocsProps) {
  return (
    <>
      <div id="audits-overview" className={`docs-section ${hash === "audits-overview" ? "active" : ""}`}>
        <h1>Security Audits</h1>
        <p>
          Infer Wallet and Infer Desk are non-custodial wallets: your keys are generated on
          your own device and never leave it, except as encrypted backups that only you
          control. Both products are built with defense in depth, which means the security
          of the wallet never rests on a single check. Every inbound channel — connections
          from dApps, bridge requests, pairing messages, and responses from the network —
          is treated as untrusted input. It has to be validated, and anything that
          spends or authorizes something requires explicit confirmation from you before
          it happens.
        </p>
        <p>
          Auditing is a recurring practice rather than a single event. Independent,
          AI-assisted audit passes review the codebase, and separate
          remediation-verification passes re-check that the resulting fixes hold. The
          programme started with a baseline pass in early 2026, added phased desktop
          rounds in mid 2026 and mobile rounds in mid-to-late 2026, and finished with
          dedicated pairing and transport rounds in late 2026. Stable desktop releases
          followed in v0.6.0 (October 1, 2026) and v0.6.1 (October 5, 2026).
        </p>
        <p>
          The audits cover the wallet applications themselves, and the pairing and
          bridge transport between them and with dApps. Companion services — the relay
          and back-end infrastructure, on-chain smart contracts, and the separately
          distributed wallet-adapter library — have their own security policies and are
          not covered here. On-chain smart contracts were excluded from every audit
          round.
        </p>
        <div className="important-note">
          <strong>⚠ Read this before drawing conclusions.</strong> This page summarizes the
          themes that were audited and how each round ended. It is not an exhaustive list
          of individual findings. Where a finding is described here as addressed, it means
          it was either fixed in the audited codebase or is tracked under a documented
          accepted risk. Fixes land in the source first, so shipped binaries — particularly
          store-distributed mobile builds — can lag behind the source they were built from.
        </div>
      </div>

      <div id="audits-infer-desk" className={`docs-section ${hash === "audits-infer-desk" ? "active" : ""}`}>
        <h1>Infer Desk Audits</h1>
        <p>
          Infer Desk went through a baseline pass in early 2026, several phased rounds
          through mid 2026, and a further hardening round together with dedicated
          pairing and transport rounds in late 2026. Each round reviewed the full
          application and its bridge surface, and each remediation was re-verified before
          the next round began.
        </p>
        <p>
          The most significant resolved findings concern transaction signing integrity
          and the way release builds handle untrusted input. On the signing path, user
          approval is now bound to the exact bytes that go on to be signed, so what you
          review is what gets signed. On the build side, the handling of untrusted input
          in release artifacts was tightened so that it matches the behaviour that was
          audited.
        </p>
        <p>Other resolved theme areas include:</p>
        <ul>
          <li>Key management and protection at rest</li>
          <li>Transport security across the bridge interfaces</li>
          <li>Replay protection and freshness of requests</li>
          <li>Time-of-check/time-of-use issues on persistent state</li>
          <li>Supply chain and release provenance</li>
          <li>Memory hygiene and secret zeroization</li>
          <li>Session lifecycle management</li>
          <li>WebView sandboxing in the in-app dApp browser</li>
          <li>Audit logging</li>
        </ul>
        <p>
          Every critical and high finding from the desktop rounds has been fixed or is
          tracked under a documented accepted risk. The items below are the accepted
          risks we consider safe to publish; the full list stays internal.
        </p>

        <h2>Documented accepted risks</h2>
        <ul>
          <li>Residual browser-feature gaps on macOS remain an operator-accepted backlog item.</li>
          <li>Windows is supported, but native re-verification of the platform layer is still pending.</li>
          <li>The air-gapped signing-device posture has been retired as an accepted posture change.</li>
          <li>A build-time toolchain trust anchor is accepted by the operator.</li>
          <li>Hostname verification in the mTLS transport relies on SPKI pinning, which is accepted.</li>
          <li>A debug-only local loopback escape hatch exists in debug builds only, and is accepted.</li>
          <li>Full-disk encryption is recommended to resist forensic recovery from storage media; this is documented as a residual risk.</li>
        </ul>
      </div>

      <div id="audits-infer-wallet" className={`docs-section ${hash === "audits-infer-wallet" ? "active" : ""}`}>
        <h1>Infer Wallet Audits</h1>
        <p>
          Infer Wallet received an initial audit pass in mid 2026, an independent
          follow-up pass, and a late-2026 verification pass that re-checked the earlier
          remediations rather than only reviewing new code. The same theme list was
          applied, weighted toward the paths a mobile wallet actually uses.
        </p>
        <p>
          The most significant resolved finding is again transaction signing integrity:
          approval given by a dApp is now bound to the exact signed bytes through
          canonical signing, so the payload that is displayed, the payload that is
          approved, and the payload that is signed cannot diverge. Transactional storage
          was hardened alongside it, and the same hardening themes that applied on the
          desktop — key management at rest, replay protection, session lifecycle, and
          memory hygiene — were addressed where they applied on mobile.
        </p>

        <h2>Open items</h2>
        <ul>
          <li>The message-signing consent flow does not yet match the hardened transaction path, so explicit user confirmation on message signing remains an open item.</li>
          <li>Biometric unlock is not yet paired with a second factor.</li>
          <li>Some physical-device acceptance checks remain outstanding.</li>
          <li>One support-guidance item is deferred by the owner.</li>
        </ul>
        <p>
          <strong>Note:</strong> service-side data-lifecycle findings are handled as a
          separate server-side track and are not part of the wallet application's audit
          summary. DEX price and slippage behaviour is out of scope for the wallet.
        </p>
        <p>
          All critical and high findings on the transaction path are fixed. The
          message-signing and biometric items listed above remain open and tracked, and
          are not counted as resolved.
        </p>
      </div>

      <div id="audits-themes" className={`docs-section ${hash === "audits-themes" ? "active" : ""}`}>
        <h1>What the Audits Cover</h1>
        <p>
          The same themes are checked on every pass, across both products, so that each
          round builds on the last instead of starting from scratch.
        </p>
        <ul>
          <li><strong>Transaction signing integrity:</strong> whether what the user approves is exactly what gets signed, with no room for substitution in between.</li>
          <li><strong>Cryptographic key management and protection at rest:</strong> how keys are generated, derived, encrypted, stored, and destroyed.</li>
          <li><strong>dApp connection and bridge transport security:</strong> authentication, authorization, and the exposure of each integration surface.</li>
          <li><strong>Pairing and relay trust (cross-product):</strong> what a paired client or an intermediary relay is able to observe, delay, or replay.</li>
          <li><strong>Replay protection, freshness, and deduplication:</strong> whether a captured request can be re-submitted or reused out of order.</li>
          <li><strong>Time-of-check/time-of-use on persistent state:</strong> whether a decision is still valid at the moment it is acted on.</li>
          <li><strong>Supply chain, release provenance, and auto-update:</strong> where artifacts come from, how they are verified, and how updates are applied.</li>
          <li><strong>Memory hygiene and secret zeroization:</strong> whether sensitive material is cleared rather than left in freed memory.</li>
          <li><strong>Authentication, throttling, and session lifecycle:</strong> repeated attempts, rate limits, and how long an authenticated session stays valid.</li>
          <li><strong>Auto-lock and user-presence semantics:</strong> whether the app can act on the user's behalf when they are not present.</li>
          <li><strong>DApp browser / WebView sandbox:</strong> the boundary between untrusted page content and wallet capabilities.</li>
          <li><strong>Platform support and packaging:</strong> platform-specific behaviour and the way the application is built and installed.</li>
          <li><strong>Audit logging and disclosure hygiene:</strong> what is recorded, and what can safely be published about it.</li>
        </ul>
      </div>

      <div id="audits-reporting" className={`docs-section ${hash === "audits-reporting" ? "active" : ""}`}>
        <h1>Reporting a Vulnerability</h1>
        <p>
          If you believe you have found a security issue in Infer Wallet or Infer Desk,
          please report it to{" "}
          <a href="mailto:spielcrypto@inferenco.com">spielcrypto@inferenco.com</a> or{" "}
          <a href="mailto:singularityshift@inferenco.com">singularityshift@inferenco.com</a>.
          These are the only addresses for security reports.
        </p>
        <p>
          We ask that you give us reasonable time to release a fix before disclosing
          publicly — coordinated disclosure keeps users protected while the fix ships.
          Please include reproduction steps and the affected platform, so the report can
          be reproduced and confirmed.
        </p>
        <p>
          Please note that on-chain smart contracts and companion services are out of
          scope of these audits, and reports about them should be directed through the
          relevant project's own security process.
        </p>
      </div>
    </>
  );
}
