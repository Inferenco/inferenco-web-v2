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
  Simplified. `ar` pages are rendered LTR on this site (Nemesis Go decision D3):
  no `dir="rtl"` is set.
- English wins. If the English text changes, re-translate the locales and record
  a native/professional review here before describing any locale as reviewed.
