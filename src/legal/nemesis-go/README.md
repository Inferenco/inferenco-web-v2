# Nemesis Go legal documents

English is the authoritative text. `privacy.md` and `terms.md` in this directory
are the source of record and are published at:

- https://inferenco.com/nemesis-go/privacy/
- https://inferenco.com/nemesis-go/terms/

## Translations

The 13 locale directories (`ar`, `de`, `es`, `fr`, `it`, `ja`, `kk`, `pt-BR`,
`pt-PT`, `ru`, `tr`, `uk`, `zh`) each contain a `privacy.md` and `terms.md`,
published at `/nemesis-go/<lng>/<doc>/`. They exist because App Store Connect
asks for a privacy and a terms URL per localisation.

**Provenance: these 26 documents are machine translations of the English
sources, generated 2026-11-22 and UNREVIEWED by professional legal translators
or native-speaker reviewers.** They mirror the same disclosure practice as the
site catalogues in `src/i18n/locales/README.md`. Each translated page carries a
visible note that it is a translation and that the English version prevails in
case of conflict.

Rules for these files:

- Keep the structure of the English source identical: same headings, same
  paragraph order, same links and `mailto:` targets. Only prose is translated.
- Never translate brand names (Nemesis Go, Inferenco, Spielcrypto, Singularity
  Shift), e-mail addresses or URLs.
- `pt-BR` and `pt-BR`/`pt-PT` must stay genuinely distinct variants, and `zh` is
  Simplified. `ar` pages render **RTL on this site** (`dir="rtl"` on `<html>`):
  a deliberate site-only reversal of Nemesis Go decision D3 — the app itself
  stays LTR, and the cross-repo divergence is intentional and documented.
- English wins. If the English text changes, re-translate the locales and record
  a native/professional review here before describing any locale as reviewed.

## Support page

A lighter, non-legal support page is published alongside the legal pair:

- https://inferenco.com/support/ (English)
- https://inferenco.com/support/<lng>/ for each of the 13 locales

Its sources live one level up from this directory: `src/legal/support.md` (EN)
and `src/legal/support/<lng>.md` (13 locales). It is emitted by the same
`src/legal/build.ts` plugin (appended to the legal `pages` array), so it shares
the template, the slashless→directory 301 redirects, and the `ar` `dir="rtl"`
handling. The related nav links to `/games-and-apps/` and `/` with a
"Related pages" aria-label (legal pages keep "Related legal page").

The page splits the contact by platform publisher: **Android — Singularity
Shift Ltd.** (`singularityshift@inferenco.com`) and **iOS — Spielcrypto LLC.**
(`spielcrypto@inferenco.com`). These are the same two addresses as the footer
and the terms page.

**Provenance: the 13 locale support pages are machine translations of the
English source and UNREVIEWED by native-speaker reviewers.** Each carries a
short visible note that it is a machine translation. Unlike the legal pages
there is no "English prevails" clause — this is support guidance, not a legal
text. The same rules apply: keep the English structure (same H1/H2 order),
never translate brand/company names (Singularity Shift Ltd., Spielcrypto LLC.,
Inferenco), the platform names Android/iOS, e-mail addresses or `mailto:`
targets; `pt-BR`/`pt-PT` stay distinct in the prose and `zh` is Simplified.
