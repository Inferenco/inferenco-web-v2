# Site locale catalogues

These files are the client-side translation catalogues for the Inferenco
marketing site (`src/i18n/index.ts` loads `en.json` eagerly and the other 13
files lazily via `import.meta.glob`).

## Languages

The 14 supported locales and their render order are copied verbatim from the
Nemesis Go mobile app registry
(`nemesis-go-v3/mobile/src/i18n/languages.ts`) so the two surfaces stay in
lockstep. See `src/i18n/languages.ts` for the endonyms and BCP 47 tags.

`en, ar, de, es, fr, it, ja, kk, pt-BR, pt-PT, ru, tr, uk, zh`

`zh` is Simplified Chinese. Arabic renders **right-to-left on this site** — a
deliberate site-only reversal of the app's decision D3 (the Nemesis Go app
itself stays LTR; the cross-repo divergence is intentional and documented in
the PR). `applyDocumentLang` sets `dir="rtl"` for `ar` and `dir="ltr"` for every
other locale; the English-only islands (/docs, /infer*) carry static `dir="ltr"`
wrappers so their prose stays left-to-right inside the RTL chrome.

## Provenance — IMPORTANT

- **Source:** every file here was produced by machine-translating
  `en.json` (221 leaf keys across the `chrome`, `home`, `media` and `blog`
  namespaces) on **2026-11-22**. They are fresh site catalogues; they are not
  derived from the Nemesis Go app's own 631-key catalogues.
- **Status: UNREVIEWED by native speakers.** No human translation pass has
  happened yet for any locale other than English. Treat wording, tone, and
  register in `ar, de, es, fr, it, ja, kk, pt-BR, pt-PT, ru, tr, uk, zh` as
  provisional.
- **Follow-up (not done):** a native-speaker review of each locale, starting
  with the marketing copy in the `home` and `media` namespaces. Until that
  review lands, do not describe this site as human-reviewed or
  professionally translated anywhere public.
- **Never translated:** brand and product names (`Nemesis Go`,
  `Sound Flipper`, `Make My Image Fit`, `Inferenco`, `Infer Desk`,
  `Infer Wallet`, `Infer MCP`, `Infer Connect`, `Infer Ecosystem`), the
  `Onchain` group label, store names (`Google Play`, `App Store`), and
  technical terms (`Cedra`, `AIP-62`, `MCP`, `dApp`, `Web3`, `DeFi`,
  `9×9 Go`). `tests/i18n-catalogs.test.mjs` enforces this.
- **Not localised on purpose:** the onchain product pages (`/infer`,
  `/infer-wallet`, `/infer-desk`, `/infer-mcp`), everything under `/docs`, and
  the legal pages stay English in every locale. Blog *content* comes from the
  Poster API and is untranslated; only the blog page chrome is.

## Structure

Four namespaces, one nested object each:

| Namespace | Used by |
| --- | --- |
| `chrome` | `Layout.tsx` (nav, footer, language/theme controls), `NotFound.tsx` |
| `home` | `Home.tsx` |
| `media` | `UtilityApps.tsx` |
| `blog` | `Blogs.tsx`, `BlogSingle.tsx` (chrome only) |

Keys are flat-dotted in tooling but nested in the JSON. `<span>` / `<strong>`
markup inside values is rendered by `react-i18next`'s `Trans`; the tag count
must match English exactly (also enforced by the test).
