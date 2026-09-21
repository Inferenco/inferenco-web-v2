# Task: Nova → Infer Rebrand + Bridge & Pay Me Documentation

Repo: `inferenco-web-app` (this repo)
Branch: `feat/update-nova-connect-documentation`
Source-of-truth repos (read them, do not modify):
- Infer Desk: `/home/spielcrypto/inferenco/infer_desk`
- Infer Wallet (mobile): `/home/spielcrypto/inferenco/infer-wallet`
- Wallet adapter package: `/home/spielcrypto/inferenco/inferenco-wallet-adapter`

---

## 0. Setup

```bash
git fetch origin
git checkout feat/update-nova-connect-documentation
npm install          # react-markdown was added on this branch
npm run build        # must pass (tsc -b runs first)
npm test             # 4 docs-consistency tests, must pass
```

The dev server runs on port 5173 (or 5174 if 5173 is taken).

---

## 1. Rebrand: change all Nova references to Infer

**Important:** the npm adapter package is ALREADY rebranded (v0.2.0-rc.18,
`@inferenco/infer-wallet-adapter`, see its `src/index.ts`). The web docs still
teach the old names — your job is to align the website with the real package.

Verified rename mapping (from `inferenco-wallet-adapter/src/`):

| Old (in our docs today) | New (actual package export) |
|---|---|
| `@inferenco/nova-wallet-adapter` | `@inferenco/infer-wallet-adapter` |
| `@inferenco/nova-wallet-adapter/aip62` | `@inferenco/infer-wallet-adapter/aip62` |
| `@inferenco/nova-wallet-adapter/auto-register` | `@inferenco/infer-wallet-adapter/auto-register` |
| `NovaWallet` | `InferWallet` |
| `NovaClient` | `InferClient` |
| `NovaWalletOptions` | `InferWalletOptions` |
| `registerNovaWallet` | `registerInferWallet` |
| `isHostedInNovaDesk` | `isHostedInInferDesk` |
| Wallet display name "Nova Connect" | "Infer Connect" |
| `isNovaWallet` provider flag | `isInferWallet` (legacy flag still accepted in transition) |

Files with Nova references (grep counts as of this writing):

```
src/pages/docs/NovaConnectDocs.tsx   (~196)  ← biggest one; also rename file
src/index.css                        (~39)   ← .nova-* class names
src/pages/NovaDesk.tsx               (~37)   ← rename file + route
src/pages/docs/NovaAPIDocs.tsx       (~37)   ← rename file
src/pages/docs/NovaBotDocs.tsx       (~32)   ← rename file
src/pages/Docs.tsx                   (~30)   ← sidebar section ids + imports
src/pages/NovaWallet.tsx             (~24)   ← rename file + route
src/pages/Nova.tsx                   (~24)   ← rename file + route
src/pages/Home.tsx                   (~22)
src/pages/docs/WalletProfileDocs.tsx (~18)
src/components/Layout.tsx            (~8)    ← nav labels/paths
src/services/github.ts              (~7)
src/App.tsx                          (~6)    ← routes: /nova, /nova-wallet, /nova-desk
src/types/index.ts                   (~1)
```

Rename checklist:

1. File names: `Nova.tsx` → `Infer.tsx`, `NovaWallet.tsx` → `InferWalletPage.tsx`
   (avoid clashing with the adapter concept), `NovaDesk.tsx` → `InferDesk.tsx`,
   `NovaConnectDocs.tsx` → `InferConnectDocs.tsx`, `NovaAPIDocs.tsx` →
   `InferAPIDocs.tsx`, `NovaBotDocs.tsx` → `InferBotDocs.tsx`.
2. Routes: `/nova`, `/nova-wallet`, `/nova-desk` → `/infer`, `/infer-wallet`,
   `/infer-desk` (App.tsx + Layout.tsx nav). Keep old paths as redirects if
   you want to preserve deep links.
3. Docs anchor IDs: `#nova-connect-*`, `#wallet-profile-*` sections — the
   sidebar in `Docs.tsx` must stay in sync with the section `id=` attributes
   in the docs pages. NOTE: `src/index.css` mobile card labels target IDs like
   `#nova-connect-configuration .functions-table ...` — if you rename section
   IDs, update those CSS selectors too or mobile table labels break.
4. CSS classes: grep `.nova` in `src/index.css` and rename consistently with
   the JSX.
5. Update `tests/*.test.mjs` — the docs-consistency tests grep for specific
   strings (e.g. `NovaWalletOptions` fields, sidebar labels). They must be
   updated in the same commit or `npm test` fails.
6. Before renaming any symbol in code samples, verify the real export name in
   `inferenco-wallet-adapter/src/` — do not guess.

**Do NOT change (explicitly out of scope):**
- Download URLs for Infer Wallet and Infer Desk (not released yet — keep as-is).
- Anything in the `infer_desk`, `infer-wallet`, or `inferenco-wallet-adapter`
  repos — they are read-only reference for this task.

---

## 2. Replace Nova logos with Inferenco logos

Logo files currently in the repo:

```
public/assets/logos/horizontal-logo.png    ← check content; replace if Nova
public/assets/logos/sLogo.svg               ← same
public/img/nova-ecosystem/nova-logo.png     ← Nova logo, replace + rename dir/file
assets/images/nova-wallet.png               ← product screenshot/logo, replace
```

1. Get the Inferenco logo assets (ask the team for the official logo pack if
   not in `public/` already).
2. Replace each file. Grep for references (`grep -rn "nova-logo\|sLogo\|horizontal-logo" src/`)
   and update paths/names where needed.
3. Update `alt` texts.

---

## 3. New documentation: the Bridge

Add a new docs section (new file `src/pages/docs/BridgeDocs.tsx`, registered
in `Docs.tsx` sidebar). This is a major feature doc — describe it based on
the real code, not memory.

### 3.1 What to cover

The Bridge lets third-party applications issue `connect` / `sign_message` /
`sign_transaction` / `sign_and_submit` / `disconnect` / `revoke_session` /
`list_sessions` requests against the Infer Desk wallet. Three transports:

| Transport | What it is | Auth | Use it when |
|---|---|---|---|
| **Local IPC** | Unix domain socket / Windows named pipe | OS peer-credentials (`SO_PEERCRED`) | Consumer runs on the SAME machine; zero network surface |
| **Remote mTLS** | Mutual TLS over TCP | X.509 client cert + SPKI pin + allow-list | Different host, persistent integration (e.g. MCP bridge, CLI automation) |
| **Remote Nostr** | NIP-44 v2 encrypted DMs over Nostr relays | Paired-npub allow-list (Schnorr-verified) | Mobile apps, firewall-restricted hosts, ephemeral approvals, QR pairing |

Rule of thumb: same host → IPC; different host persistent → mTLS; mobile /
ephemeral / no firewall holes → Nostr.

A dApp inside Infer Desk's built-in browser uses **Expert-Safe-Protocol**, NOT
the bridge — say this explicitly to avoid confusion.

Source of truth for the content:
- `/home/spielcrypto/inferenco/infer_desk/docs/BRIDGE_TRANSPORTS.md` (decision
  table, wire formats, strengths/limitations — best starting point)
- `/home/spielcrypto/inferenco/infer_desk/docs/BRIDGE_SHOT_BUDGET.md` (ephemeral pair shot budget)
- `/home/spielcrypto/inferenco/infer_desk/docs/CLIENT_CONNECTIONS.md`
- Bridge settings UI code: `infer_desk/infer-desk-ui/src/ui/pages/bridge/`
- Wire protocol / server / client crates: `infer-desk-bridge`,
  `infer-desk-bridge-server`, `infer-desk-bridge-client`, `infer-desk-mcp-bridge`

### 3.2 Step-by-step setup guide (with images)

Write a numbered setup walkthrough. For EACH step, embed one screenshot from
`assets/images/bridge/` and FIRST edit the image to add a visual mark (red
circle / arrow / highlight) showing where the user must click for that step.

Image inventory (analyzed — what each screenshot shows):

| File | Shows | Suggested step |
|---|---|---|
| `screenshot-select-20:25:23.png` | Bridge screen overview: LAN tab, Local IPC toggle ON, Remote mTLS listener running at 127.0.0.1:21985, 1 paired client, cert expiry | Step: open Bridge settings, overview |
| `screenshot-select-20:25:33.png` | Tabs LAN / Remote / All paired apps; Local IPC settings; "View all" link | Step: navigate the tabs |
| `screenshot-select-20:25:49.png` | LAN tab: mTLS status + Cert identity section with Copy SPKI pin / Copy cert / Regenerate | Step: copy SPKI pin for client pairing |
| `screenshot-select-20:26:06.png` | LAN tab: cert identity details (subject, issuer, validity), Copy buttons, Bind address, Allow-list | Step: configure bind address / allow-list |
| `screenshot-select-20:26:23.png` | mTLS config: bind address, allow-list textarea, time-of-day rules, trusted peers / spending limits, mTLS enable checkbox, Apply | Step: full mTLS configuration |
| `screenshot-select-20:26:31.png` | Remote tab: time-of-day rules per peer CN, mTLS enable checkbox, Apply (disabled), Discovered (0) list, Add by SPKI paste | Step: pair a remote client by SPKI paste |
| `screenshot-select-20:26:46.png` | Remote (Nostr) config: allow-list, ephemeral pairing token window, max DM per npub/hour, sign-request max age, auto-revoke timeout, threshold policy manager | Step: Nostr security parameters |
| `screenshot-select-20:27:05.png` | Remote tab (Nostr) pairing area | Step: start Nostr pairing |
| `screenshot-select-20:27:18.png` | Pending pair requests, "Generate Ephemeral Pairing QR", permanent pair QRs, QR error-correction level, QR expiry, "Generate Admin Pairing QR" | Step: generate pairing QR |
| `screenshot-select-20:27:38.png` | Remote tab: Relay URLs, Allow-list, numeric params (120s / 60 / 300s / 604800s), Manage Nostr threshold policies | Step: configure relays |
| `screenshot-select-20:27:50.png` | Remote tab: allow-list with address entered, params, enable toggles, Apply / Reset Nostr | Step: apply Nostr settings |
| `screenshot-select-20:28:04.png` | All paired apps: "Inferdemo" (Nostr) + "Infer MCP" (mTLS) with Revoke buttons, Recent Bridge activity | Step: manage/revoke paired apps |
| `screenshot-select-20:36:02.png` | All paired apps: manage list, Nostr (PollConnect) + mTLS entries, Revoke, activity log pagination | Step: review bridge activity |

Image editing requirements:
- Add a clearly visible click indicator (red circle or arrow) per step.
- **Rename the files** to `bridge-step-01-overview.png`, `bridge-step-02-...`
  etc. Current names contain colons (`20:25:23`) which are invalid on Windows —
  anyone cloning the repo on Windows cannot check out these files.
- Keep the originals out of the repo (screenshots/ is gitignored); commit only
  the marked, renamed versions.

Suggested flow structure:
1. Open Settings → Bridge (overview screenshot)
2. Local IPC: same-machine apps (toggle screenshot)
3. Remote mTLS: enable listener, bind address, allow-list, copy SPKI pin,
   pair client (paste SPKI on the consumer side)
4. Remote Nostr: configure relays + allow-list, generate ephemeral pairing QR
5. Managing paired apps: revoke, activity log
6. Security notes: shot budget, auto-revoke, threshold policies

---

## 4. New documentation: Pay Me feature

Add a section (can live inside the Bridge docs or its own page).

What it does (verified from code): the **Pay Me** feature lets Infer Wallet
(mobile) scan a Nostr pair QR generated by Infer Desk's bridge Remote mode,
pair via Nostr DM (NIP-44 v2 encryption + NIP-01 Schnorr signatures), then
send a `SignAndSubmit` request so Infer Desk transfers a chosen token amount
to the mobile wallet's active account (`0x1::cedra_account::transfer` for CEDRA,
`0x1::primary_fungible_store::transfer` for FA tokens).

Key points to document:
- Entry point on mobile: Receive screen → "Pay Me" CTA (`pay-me-receive-cta` testID).
- Transport: Nostr DM — the only QR-bearing transport for bridge-remote.
- Ephemeral pairs have a shot budget: each transfer consumes it; users re-pair
  per payment cycle (see `BRIDGE_SHOT_BUDGET.md`).
- Kind-20000 events are ephemeral (relays do not store them) — the DM + poll
  loop is the delivery channel.
- No `nostr-tools` dependency: NIP-01/NIP-44/NIP-19 are hand-rolled on
  `@noble/*` — only mention this if relevant to integrators.
- Scenarios: withdrawing funds from desk to phone, merchant "pay me"
  request flows, quick transfers without typing addresses.

Source of truth:
- `infer-wallet/src/services/payMe/` — `canonicalPayload.ts`,
  `ephemeralPair.ts`, `qrParser.ts`, `nostrClient.ts`, `signAndSubmit.ts`,
  `txStatusMachine.ts`, `payMeErrors.ts`, `relayGuard.ts`
- Mobile entry screen: `infer-wallet/app/(auth)/receive.tsx`
- Desktop side: `infer_desk/infer-desk-ui/src/ui/pages/browser/external_bridge/`
- `infer_desk/docs/BRIDGE_TRANSPORTS.md` → "Nova Wallet Pay Me" use case section
- `infer_desk/infer-desk-bridge-server/src/server/nostr/pair.rs` (QR payload,
  `relay_hints` field)

If you need Pay Me screenshots, take them yourself from a running Infer Desk +
Infer Wallet (the existing `assets/images/bridge/` set does not include the
mobile-side screens).

---

## 5. Verification checklist (before every commit)

1. `npm run build` — passes (this caught 6 type errors last time; the previous
   contributor never ran it).
2. `npm test` — 4 tests pass.
3. Visual check with Playwright against the dev server:
   - Docs pages: mobile (375px), tablet, desktop (1440px)
   - Both light AND dark themes
   - Every table renders as stacked cards on mobile, no horizontal scrollbar,
     no cut content
   - Sidebar: scrolls independently when open on mobile
4. `grep -ri "nova" src/ | grep -v node_modules` — only acceptable remaining
   hits are the unchanged download URLs and any legacy-flag mentions you
   intentionally kept.

---

## 6. Commit conventions

- One logical change per commit (rebrand / logos / bridge docs / pay-me docs).
- Branch: `feat/update-nova-connect-documentation` — push directly, no PR
  needed unless the team asks.
