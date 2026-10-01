import type { DocsProps } from "./types";

export default function MigrationDocs({ hash }: DocsProps) {
  return (
    <>
      <div id="migration-introduction" className={`docs-section ${hash === "migration-introduction" ? "active" : ""}`}>
        <h1>Migration: Nova Desk → Infer Desk</h1>
        <p>
          <strong>Infer Desk v0.6.0</strong> is the rebranded continuation of Nova Desk.
          The wallet, accounts, on-chain addresses, and vault encryption are unchanged —
          the rebrand is in the product name, the data directory, the bridge configuration,
          and the wallet adapter package.
        </p>
        <div className="important-note">
          <strong>⚠ Nova Desk cannot update itself to Infer Desk.</strong> The 0.5.x
          in-app updater only installs artifacts published under the old Nova Desk
          release identity, and Infer Desk 0.6.0 is not one of them. This is a
          one-time <strong>manual install</strong>: download and run the Infer Desk
          0.6.0 installer for your platform.
          <br /><br />
          If you clicked "Install" inside Nova Desk and saw an error like{" "}
          <em>"Nova Desk downloaded the update but could not start the installer
          helper"</em>, nothing was downloaded and nothing is wrong with your
          computer or wallet. Follow the manual steps below.
        </div>
        <p>
          Most of the migration is <strong>automatic on first launch</strong>: vaults move from
          the sled store to redb, the legacy data directory is detected and its recent-vaults
          registry is forwarded, and
          the new bridge configuration schema is adopted. The pages below describe what
          changes, what is automatic, and what an operator must do manually.
        </p>

        <h2>What changes on upgrade</h2>
        <ul>
          <li>App name and window/tray/menu branding — Nova Desk → Infer Desk</li>
          <li>Data directory — <code>~/.nova_desk/</code> → <code>~/.infer_desk/</code></li>
          <li>Vault storage engine — sled → redb (auto-migrated, crash-safe)</li>
          <li>Bridge configuration schema — now stored inside the Argon2-encrypted RON envelope</li>
          <li>IPC socket path — <code>infer-desk-bus.sock</code></li>
          <li>Wallet adapter package — <code>@inferenco/nova-wallet-adapter</code> → <code>@inferenco/infer-wallet-adapter</code></li>
          <li>Wallet adapter symbols — <code>NovaWallet</code> → <code>InferWallet</code>, etc.</li>
        </ul>

        <h2>What does NOT change</h2>
        <ul>
          <li>Vault passwords, account lists, transaction history</li>
          <li>On-chain wallet addresses and account balances</li>
          <li>Encryption at rest (AES-GCM with Argon2id-stretched key)</li>
          <li>Nostr npub identities (the keypair seed is unchanged)</li>
          <li>Deeplink scheme (<code>inferenco://</code>)</li>
          <li>AIP-62 standard feature keys (<code>cedra:*</code>)</li>
        </ul>
      </div>

      <div id="migration-data-directory" className={`docs-section ${hash === "migration-data-directory" ? "active" : ""}`}>
        <h1>Data Directory</h1>
        <p>
          Infer Desk stores its data under <code>~/.infer_desk/</code> on Linux/macOS and under
          the equivalent platform path on Windows. Nova Desk used <code>~/.nova_desk/</code>.
        </p>

        <h2>Automatic fallback</h2>
        <p>
          On first launch, Infer Desk calls <code>infer_desk_app_data_dir_with_legacy_fallback()</code>:
          if <code>~/.nova_desk/</code> contains recognizable wallet artifacts
          (<code>recent_vaults.ron</code>, <code>config.ron</code>, or <code>ui_theme.txt</code>)
          and <code>~/.infer_desk/</code> does not exist yet, the new directory is created, the
          legacy <code>recent_vaults.ron</code> registry is forwarded into it (deduplicated by
          vault path), and a <code>.legacy_path_marker</code> is written into the new directory
          so the operator can see that the fallback fired. The data directory itself is always
          <code>~/.infer_desk/</code> — only the recent-vaults registry is forwarded, and the
          fallback never re-triggers once the marker exists.
        </p>
        <p>
          The legacy directory is <strong>never deleted</strong>. It is left untouched so the
          operator can inspect or copy any artifacts that were not auto-migrated.
        </p>

        <h2>Opt-out</h2>
        <p>
          Set <code>INFER_DESK_LEGACY_NO_FALLBACK=1</code> in the environment to skip the
          fallback and always require the new directory. Use this in automated test harnesses
          or in containers where the legacy directory should be ignored.
        </p>

        <h2>Vault storage migration (sled → redb)</h2>
        <p>
          Vaults stored in the legacy sled database are auto-migrated to redb on first unlock
          after upgrade. The migration is four-phase (Read → Write → Verify → Secure-delete)
          and crash-safe via a <code>migration_in_progress</code> sentinel file. If the
          process dies before the secure-delete phase, the sled database is left intact and
          the migration is retried on the next launch. Migration is idempotent.
        </p>
        <p>
          As an alternative, the vault-select screen has an explicit "Migrate this vault"
          button that lets the operator migrate a single vault on demand.
        </p>
      </div>

      <div id="migration-pairs-and-certs" className={`docs-section ${hash === "migration-pairs-and-certs" ? "active" : ""}`}>
        <h1>Pairs and Certificates</h1>
        <p>
          The bridge stores its configuration in an Argon2-encrypted RON envelope. Most of the
          configuration carries over automatically. Two pieces of state require operator
          attention: mTLS certificates and the Nostr master switch.
        </p>

        <h2>mTLS — server identity is rotated on upgrade</h2>
        <p>
          The bridge-server configuration (bind address, allow-list, CA path, per-CN policy) is
          carried over automatically. <strong>The server certificate and private key are not
          carried over.</strong> Operators must re-mint the mTLS identity on first Apply after
          upgrade. This is the documented "rotation on upgrade" posture — it ensures that any
          pre-upgrade leaked private key material cannot be replayed against consumers.
        </p>
        <p>
          After re-mint, copy the new SPKI pin from Settings → Bridge and update every remote
          consumer that was paired with the old pin.
        </p>

        <h2>Nostr — settings carry over verbatim</h2>
        <p>
          The existing <code>RemoteNostr</code> entry is migrated as-is, including its{" "}
          <code>enabled</code> flag. If you had Nostr enabled in Nova Desk, it is still enabled
          in Infer Desk on first launch. The default relay is only seeded when no{" "}
          <code>RemoteNostr</code> entry exists at all, and that fresh entry starts with{" "}
          <code>enabled: false</code>.
        </p>
        <p>
          <strong>Security consequence:</strong> if you ran Nova Desk with Nostr enabled,
          open <strong>Settings → Bridge → Remote</strong> on first launch and verify the
          master switch matches your intent. Infer Desk will otherwise continue emitting DMs to
          your existing paired clients.
        </p>

        <h2>Existing pairs and allow-lists</h2>
        <p>
          Pairings made under Nova Desk live in the encrypted pair store and are readable by
          Infer Desk. The Nostr npub allow-list and the mTLS CN allow-list both survive the
          upgrade without re-entry. Pair revocation continues to work as before.
        </p>
      </div>

      <div id="migration-bridge-config" className={`docs-section ${hash === "migration-bridge-config" ? "active" : ""}`}>
        <h1>Bridge Configuration</h1>
        <p>
          The Bridge is Infer Desk's third-party integration surface. See{" "}
          <a href="/docs#bridge-introduction">Bridge → Introduction</a> for the transport
          overview; this page covers only what changes during migration.
        </p>

        <h2>Local IPC socket</h2>
        <p>
          The default Unix socket path is now <code>~/.infer_desk/runtime/infer-desk-bus.sock</code>.
          On Windows, the named pipe is <code>\\.\pipe\infer-desk-bus</code>.
          Native consumers that hardcoded the legacy path must update.
        </p>

        <h2>Configuration schema</h2>
        <p>
          Bridge settings now live under the <code>bridges</code> key of the encrypted RON
          envelope. The schema is documented in <code>BridgesConfig</code> (see
          <code>infer-desk-bridge</code>). Field names match the keys shown in the Bridge
          Settings UI.
        </p>

        <h2>Environment variables</h2>
        <p>
          Use the <code>INFER_DESK_*</code> prefix (e.g.{" "}
          <code>INFER_DESK_ALLOW_HTTP_LOOPBACK</code>). The legacy <code>NOVA_DESK_*</code>
          variables are <strong>not</strong> honored by Infer Desk — update any scripts or
          container definitions that still set them.
        </p>
      </div>

      <div id="migration-wallet-adapter" className={`docs-section ${hash === "migration-wallet-adapter" ? "active" : ""}`}>
        <h1>Wallet Adapter</h1>
        <p>
          The Inferenco-Wallet-Adapter package was renamed from <code>@inferenco/nova-wallet-adapter</code>
          to <code>@inferenco/infer-wallet-adapter</code> at v0.2.0. All public symbols use
          the new names; legacy names are gone.
        </p>

        <h2>Rename table</h2>
        <div className="functions-table">
          <table>
            <thead>
              <tr>
                <th>Old (Nova)</th>
                <th>New (Infer)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>@inferenco/nova-wallet-adapter</code></td>
                <td><code>@inferenco/infer-wallet-adapter</code></td>
              </tr>
              <tr>
                <td><code>NovaWallet</code></td>
                <td><code>InferWallet</code></td>
              </tr>
              <tr>
                <td><code>NovaClient</code></td>
                <td><code>InferClient</code></td>
              </tr>
              <tr>
                <td><code>NovaWalletOptions</code></td>
                <td><code>InferWalletOptions</code></td>
              </tr>
              <tr>
                <td><code>registerNovaWallet</code></td>
                <td><code>registerInferWallet</code></td>
              </tr>
              <tr>
                <td><code>isHostedInNovaDesk</code></td>
                <td><code>isHostedInInferDesk</code></td>
              </tr>
              <tr>
                <td><code>"Nova Connect"</code> (display name)</td>
                <td><code>"Infer Connect"</code></td>
              </tr>
              <tr>
                <td><code>inferenco:nova-*</code> (session storage keys)</td>
                <td><code>inferenco:infer-*</code> (legacy still accepted during transition)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Migration steps</h2>
        <ol>
          <li>
            <code>npm uninstall @inferenco/nova-wallet-adapter</code> (or{" "}
            <code>pnpm remove</code>).
          </li>
          <li>
            <code>npm install @inferenco/infer-wallet-adapter@^0.2.0</code>.
          </li>
          <li>Find-and-replace the symbol names in your dApp source per the table above.</li>
          <li>
            Existing sessions stored under <code>inferenco:nova-*</code> are read by the new
            adapter during the transition window — they are migrated to the new key on the
            next <code>connect()</code> call.
          </li>
        </ol>

        <p>
          For a deeper walk-through of the session-storage migration and the adapter's
          dual-listen behavior during the transition, see{" "}
          <a href="/docs#infer-connect-version-migration">Infer Connect → Version Migration</a>.
        </p>
      </div>

      <div id="migration-action-checklist" className={`docs-section ${hash === "migration-action-checklist" ? "active" : ""}`}>
        <h1>Action Checklist</h1>
        <p>
          A minimal operator upgrade path. Each step is one paragraph; the previous pages
          cover the why.
        </p>

        <ol>
          <li>
            <strong>Back up the legacy directory.</strong> A plain copy is enough —
            <code>cp -r ~/.nova_desk ~/.nova_desk.bak</code>.
          </li>
          <li>
            <strong>Install Infer Desk v0.6.0</strong> from{" "}
            <a href="https://github.com/Inferenco/infer-desk-releases/releases/tag/v0.6.0">
              the official release page
            </a>
            . Verify the download against the minisign signature bundled with each asset.
            <strong>Note:</strong> all official Infer Desk downloads live on the{" "}
            <a href="/infer-desk">Infer Desk page</a>, which always points at the latest
            available assets across every supported platform.
          </li>
          <li>
            <strong>First launch.</strong> Infer Desk detects the legacy directory and forwards
            its recent-vaults registry into the new data directory. Watch the migration summary banner — it lists migrated files and any items that
            require your attention (e.g. "mTLS identity needs re-mint").
          </li>
          <li>
            <strong>Unlock each vault.</strong> Verify accounts, balances, and transaction
            history look correct. The vault has moved from sled to redb under the hood; the
            user experience is unchanged.
          </li>
          <li>
            <strong>If you used Remote mTLS:</strong> open Settings → Bridge → Apply. The
            server cert is re-minted automatically on first Apply; copy the new SPKI pin and
            re-pair each remote consumer.
          </li>
          <li>
            <strong>If you used Remote Nostr:</strong> open Settings → Bridge → Remote and
            <strong>verify</strong> the master switch state — your Nova Desk setting (on or
            off) carried over unchanged. The switch is <strong>not</strong> forced off after
            migration.
          </li>
          <li>
            <strong>Update your dApps.</strong> Install the new adapter package and rename
            symbols per the table in{" "}
            <a href="/docs#migration-wallet-adapter">Wallet Adapter</a>.
          </li>
          <li>
            <strong>Keep the legacy backup</strong> until everything checks out for at least
            one full sync cycle.
          </li>
        </ol>

        <p>
          <strong>Future updates are automatic again from 0.6.0 onward.</strong>{" "}
          Settings → Check for Updates → Install handles every release after
          this one. The manual step above is one-time.
        </p>

        <p>
          If anything looks wrong, the legacy backup is the source of truth — Infer Desk
          never modified it during migration.
        </p>
      </div>
    </>
  );
}
