# Inferenco website redesign and retheme

## Direction

Use **mock 1, Blue Hour**, for the homepage composition and **mock 2, Collection**, for the Apps & Games catalogue. Paco reacted positively to those first two in the corrected series. Use **mock 4, Signal**, as the reference for immersive, individually themed product pages, starting with Sound Flipper. Mock 3 informs the typography and lighter surfaces for light mode. Preserve Inferenco’s original blue flame, cyan links and independent partnership identity. Treat headlines, device renders, app controls and platform claims in the mocks as concept material.

| Surface | Composition and first action |
| --- | --- |
| Homepage `/` | Short studio introduction with a Nemesis Go feature and one primary **Explore apps & games** link. Make the asset and link visible early on mobile. Follow with Sound Flipper and Resize & Compress cards, a short **Our story** section, then Onchain and support. Link to Journal in navigation and surface an update only when there is suitable published content. |
| Apps & Games `/games-and-apps` | One heading followed immediately by the three screenshot-led cards. Three columns fit at desktop, two where tablet width allows, and one on narrow screens. Each card opens its own product page. Keep old catalogue anchor IDs and preserve the existing `/utility-apps` query/hash behavior. |
| Product pages | Proposed URLs `/games-and-apps/nemesis-go/`, `/games-and-apps/sound-flipper/` and `/games-and-apps/resize-and-compress/`. Share a shell with product heading, screenshot or product scene, platform actions, a small feature gallery, support and related apps. Give each page its own accent, art direction and crop. |
| Journal `/blogs` | Feature the latest published article when only one is available. Use a predictable list as the archive grows. Preserve `/blogs/:id` and handle slow, empty and failed content fetches. |
| Onchain and documentation | Keep **Onchain** in desktop and mobile navigation and an explicit homepage section with **Infer Desk**, **Infer Wallet**, **Infer MCP**, **Infer Connect**, **Infer Ecosystem** and **Infer Bot**, plus **Documentation**. Use existing URLs, including `/docs#infer-connect-introduction` for Infer Connect. Preserve established docs deep links and product downloads. |
| Support, contact and legal | Keep Support in primary navigation, expose both partner contact emails in the footer, and preserve localized support and Nemesis Go policy links. If a contact overlay remains, use short button labels with wrap-safe email addresses. |

The first release covers the shared shell, Home, Apps & Games, three product pages and the Journal index. Apply the shell and check compatibility on existing Onchain, article, docs, legal and support routes. Keep documentation and legacy product interiors within their established content scope. Keep existing app functionality, analytics/consent behavior and hosting unless a separate decision addresses them.

## Product page art direction

| Page | Custom treatment | Product evidence and primary action |
| --- | --- | --- |
| Sound Flipper | Near-black navy with cyan-to-violet waveform and a quiet field behind the type. A single phone or unframed screenshot shows the converter. Draw the decorative waveform from project-owned demo audio or use an original vector treatment. Use CSS for glow and a separate device frame if needed. | Show Convert first, then a genuine editing example. Start with **Open Sound Flipper** for web and provide Android and iOS actions separately, subject to launch-time verification. |
| Nemesis Go | Blue Hour woodland, diffuse cyan light and warm board colours. Use the real game forest as the background plate. Extend the edges or create separate transparent mist only if crops need it. Make the board recognisable at phone width. | Use a clean real match with a legible board and no transient status. Primary action is Google Play. Preserve the current iOS coming-soon state until the product owner confirms a change. |
| Image: Resize & Compress | Warm sunrise accent and a strong before/after photo treatment inspired by the mock. Use the actual resize or compression UI with an approved demo photograph. Add a quiet gradient or crop-guide motif if needed. | Show the current workflow and actual inspection or output states. Start with the web app and provide Google Play as a separate action. Confirm public naming before changing existing “Make My Image Fit” copy. |

Build the theme around shared semantic tokens for canvas, surface, text, muted text, accent, focus and borders, with product overrides scoped to product pages. Preserve saved light/dark preferences and system defaults. Keep the homepage flame and overall typography consistent. Use art to support the page rather than asking visitors to read labels or platform badges rendered into artwork.

### Inputs collected

Eight byte-for-byte source copies are in `docs/redesign/source-assets/`. The four concept PNGs are in `docs/redesign/mockups/`. These folders contain local references. The existing Git ignore rules cover the PNG and JPG files.

| Local copy | App workspace source and provenance |
| --- | --- |
| `nemesis-go-match.png` | `/home/james/Nemesis-GO-v3-main/docs/visual-foundation-review-2026-11-17/phone-match.png` · 720×1560 · real Android review capture from a local visual checkpoint. |
| `nemesis-go-game-dark.png` | `/home/james/Nemesis-GO-v3-main/docs/ui-ux-audit-2026-11-15/screens/17-game-dark.png` · 1440×3120 · earlier real review capture. |
| `nemesis-go-misty-forest.jpg` | `/home/james/Nemesis-GO-v3-main/mobile/assets/appearance/backgrounds/misty-forest-wide.jpg` · 1536×1024 · artwork wired to the in-app background. |
| `sound-flipper-convert-dark.png`, `sound-flipper-trim-and-fades.png` | `/home/james/sound-flipper/apps/mobile/store/screenshots/20261102/` · `01-convert-dark.png` and `03-trim-and-fades.png` · 1080×1920 Android review captures. |
| `image-fit-home.png`, `image-fit-resize.png`, `image-fit-inspection.png` | `/home/james/Image-fit/apps/mobile/build/store-listing-20261111/frames/` · `home-clean.png`, `t8.png`, `t18.png` · 1008×2064 raw frames from the store-listing preparation. |

### Custom asset production

1. **Use current product UI.** The copied screens are layout references and may differ from published versions. Compare them with the current public builds and recapture where needed. Use a clean board, project-owned demo audio and cleared photo inputs. Remove incidental personal data through the capture setup. Reuse the site's original flame in `assets/logos/flame.png`. Reuse the existing Nemesis Go WebP icon in `public/img/infer-ecosystem/utility-apps/`.
2. **Create separate art layers.** Use the existing forest first, a waveform treatment for Sound Flipper and a warm gradient or photo crop for Resize & Compress. Use ImageGen for a forest extension or isolated atmospheric texture only if the approved layout needs it. Keep the actual app pixels, logos, optional frame and art independently replaceable. Start with static art. A short device demo can be added to a product page if it improves comprehension and sits outside the initial load.
3. **Compose for each layout.** Prepare 16:9 desktop plates with safe space for copy, plus 4:5 or equivalent mobile crops where needed. Keep the Go board and waveform away from crop edges. Put the product image in its own responsive element. Reposition artwork for RTL while preserving the orientation of screenshots and logos.
4. **Optimise approved outputs.** Save descriptive WebP/AVIF derivatives alongside deployed image assets under `public/img/` with a provenance note. Supply responsive widths, explicit intrinsic sizes and sensible `sizes`. Load the principal hero image eagerly and lazy-load below-the-fold images. Produce proper per-page social images with approved copy. Use an initial budget of roughly 250 KB for the delivered primary visual on narrow phones and 450 KB for the desktop equivalent, then check image quality and measured load cost.

## Responsive, Arabic and accessibility requirements

- Design at **390 px mobile, 768 px tablet and 1440 px desktop** in parallel, including Arabic mobile and desktop and a light-theme pass. Check 320 px, phone landscape, 1024 px and both sides of existing header transitions. The mobile hero stacks in meaningful reading order, surfaces product imagery early and keeps a clear primary action. At wider sizes, align to a shared content grid and keep captions, actions and card titles clear of decorative artwork.
- Reuse `src/i18n` and all 14 existing locale catalogues. Add translated copy, action labels, menu names and meaningful alt text. Keep Portuguese variants distinct and test long German and Kazakh strings and Japanese/Simplified Chinese wrapping. Get an Arabic reader to review the marketing copy and at least the header, hero, catalogue, store actions and contact flow.
- In Arabic, the existing locale runtime sets `<html lang="ar" dir="rtl">`. Use logical CSS for placement and spacing, preserve DOM and focus order, mirror directional chevrons and anchor drawer placement to the appropriate inline edge. Isolate mixed-direction brand names, emails and URLs with bidi markup. Keep app imagery and platform marks in their original orientation. Retain the English/LTR interiors of Onchain and docs, with English language semantics, while surrounding shared chrome stays in the selected locale. Preserve existing Arabic support and legal URLs. [W3C guidance on HTML text direction](https://www.w3.org/International/questions/qa-html-dir).
- Test against WCAG 2.2 AA criteria relevant to the changes. Provide a skip link, clear headings, high-contrast text and focus in both themes, visible mobile close controls, and 44 CSS px design targets for primary touch controls where practical. Use accessible disclosure for Onchain and proper keyboard semantics for the language control. Any modal needs initial focus, Escape, focus containment and restoration. Check at 200% text zoom, 320 CSS px reflow, keyboard-only navigation, reduced motion, VoiceOver on iOS and TalkBack on Android. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Engineering and release sequence

| Milestone | Owner and scope | Acceptance evidence |
| --- | --- | --- |
| 0 · Baseline and approval | James and Paco approve home/card hierarchy and the three product accents. App maintainers verify screen version, naming and store availability. Engineering restores a lockfile-backed local dependency baseline and measures current bundle and hero load. | Desktop and mobile reference layouts for Home, Catalogue and Sound Flipper. Include Arabic, both themes and a signed-off list of public-facing product claims. |
| 1 · Header → catalogue → Sound Flipper | Engineering extends `src/components/Layout.tsx`, `src/pages/Home.tsx`, `src/pages/UtilityApps.tsx`, `src/App.tsx`, `src/data/mediaProducts.ts`, locale catalogues and scoped styles. Build the smallest complete journey. Share product/action data across cards and details so platform states stay consistent. | An English or Arabic visitor on mobile or desktop can open the catalogue, reach Sound Flipper, use a real platform link and return with Back. Theme and language persist after reload. Menu, language and Onchain controls work with touch and keyboard. |
| 2 · Remaining surfaces | Engineering and design add the Nemesis Go and Resize & Compress page variants, finish the homepage Onchain/story sections, real product media and Journal index. Keep the release and support paths working. | All three direct URLs and their primary actions work. Each page has a recognisable theme without structural drift. All six Onchain destinations and documentation are reachable on mobile and desktop. |
| 3 · Public URL and metadata fixes | Engineering handles this as a separately reviewable release dependency. Keep GitHub Pages initially and emit static entries for known routes plus route-specific titles, descriptions, canonicals and Open Graph metadata in the initial HTML. Reuse the static generation setup where appropriate. Move or generate current robots and sitemap files into the published output. | Test the built artifact on a Pages-equivalent static host. Published URLs return 200 directly, one canonical form wins, redirects/anchors still resolve, and a random unknown URL returns genuine 404. Verify image/font URLs at nested paths. |
| 4 · Browser QA and authorised release | Engineering and reviewers cover browser/device acceptance, keyboard/RTL, link and build checks. Confirm support contacts and the docs/Onchain regressions with the maintainers. | Existing scripts pass and focused browser checks cover the new journeys. Capture representative English/Arabic screens and check the production URLs after authorised release. |

### Route and search acceptance

A public HTTP check on **23 November 2026** returned 200 for `/`, `/support/`, `/support/ar/` and `/app-ads.txt`. It returned 404 for `/games-and-apps`, `/blogs`, `/docs`, `/robots.txt`, `/sitemap.xml` and a deliberately missing URL. The source uses BrowserRouter and copies `dist/index.html` to `dist/404.html`, which can display a route after a 404 response. Root robots and sitemap inputs exist but refer to obsolete pages. The active build and publish contracts are `package.json`, `vite.config.ts` and `.github/workflows/deploy.yml`.

- Check direct status, headers and source HTML for the homepage, catalogue, three product pages, Journal index, a real article, documentation, existing Onchain pages, localized legal and support, robots, sitemap and app-ads. Test the existing redirects and hashes in the browser and check that the CI-built MCP release manifest still loads.
- Docs use a shared entry with section hashes. Preserve those anchors. Journal articles are backed by the Poster API. Define how published article IDs enter the build and refresh on publication before making correct article status a release claim. Use verified canonical URLs in the sitemap. The client-side locale picker alone does not create indexable per-language marketing URLs. Keep localized SEO URL strategy as a separate decision.
- GitHub Pages deploys from the main workflow. Review and record the commit to restore before release, and revert the relevant deployment change through the same pipeline if acceptance fails. Preserve the existing domain, legal and ad verification files. Any hosting change or deployment requires a separate decision and authorization.

### Verification

Run `pnpm test`, `pnpm lint`, `pnpm run build` and `pnpm run test:legal` in WSL. Add focused browser coverage for product journeys, direct URLs, theme and locale switching, and drawer/disclosure/dialog behavior. Use Chromium, Firefox and Safari/WebKit with real iOS and Android checks for touch, zoom, sticky elements and store links. Compare before/after mobile load and layout shift using a consistent throttled profile. Build-tool results and browser/production checks are separate evidence.

Planning baseline: the existing test runner executed 58 tests in the current checkout. **52 passed and six i18n-runtime tests failed because the installed dependency tree could not resolve `i18next`**. Restore dependencies from the lockfile and rerun before interpreting those failures as product regressions. Device and locale layouts, final art and new route behavior are deliverables for implementation. No redesign, custom artwork, production changes or release checks were performed during this planning pass.

## Implementation record

The homepage, catalogue, three product pages and Journal index are implemented on `feat/redesign-retheme`. The shared header and footer retain every Onchain destination, documentation, both partner contacts and the localized support and Nemesis Go policy URLs.

The publishable media is under `public/img/redesign/`. Published Google Play captures supplied the golden Go board and the three Resize & Compress UI views. The Sound Flipper converter and editor came from the copied workspace captures and were visually cross-checked against Google Play. The game’s forest, the site’s flame and the Image Fit demo photograph came from their original workspaces. The waveform is original decorative artwork. The before/after example uses 960×640 and 320×214 WebP files, at 75,952 and 10,390 bytes respectively. The four 1200×630 share images use the same media.

A production-configured local build generated the published Journal article route from the Poster API. The HTTP checks covered canonical route delivery, published article metadata, app-ads, locale-specific legal and support, the sitemap, and genuine 404 responses. The regular suite passed 56 checks, legal/support passed 24, and static route verification passed four. Lint and the build passed.

The throttled Pixel 7 emulation compared the same production build toolchain at the original branch point and on the redesigned branch. Three cold-cache runs per version used 100 ms latency and 192 KiB/s download throughput, with external requests blocked. The median homepage largest-contentful paint was 9.0 s before and 2.4 s after. Image transfers were 1,406 KiB and 149 KiB. Observed cumulative layout shift was 0.085 and 0.000.

The browser checks exercised all 14 locales in Chromium with no horizontal overflow across the five marketing routes. Arabic was also tested in Firefox and iPhone-emulated WebKit. The mobile journey covered keyboard skip navigation, drawer focus and Escape, all Onchain destinations, product navigation, persisted language/theme, legacy hash navigation and localized support.

A physical Pixel running Chrome passed the local preview check at 411 CSS px. Touch navigation reached the catalogue and Sound Flipper, the drawer focused its close button and showed all seven Onchain menu links, the header stayed fixed during scroll, and Arabic switched the document to RTL. The Sound Flipper store links were present, and a pinch gesture increased the visual viewport scale to 1.40. The temporary USB forwarding was removed.

The follow-up Arabic editorial review refined the homepage and product copy, localized the Web label and made Journal failure states use translated messages. Browser fixtures verified the Arabic article 404 and 503 states and the return link. The MCP page loaded the current public download manifest and switched all three download links when a different tag was supplied. An axe-core scan reported no automated violations across the six redesigned surfaces in the tested English desktop and Arabic mobile configurations, including the open Arabic drawer. A separate 200% root text-size test passed at 320, 390, 768, 1025 and 1440 CSS px for English and Arabic.

Follow-up iPhone 13 and iPhone SE emulation in WebKit passed Arabic touch navigation, initial drawer focus, Onchain expansion, theme persistence across reload, sticky header behavior, and the Sound Flipper App Store navigation target. Nemesis Go and Resize & Compress presented no iOS store action in either configuration.

Physical iPhone verification and a native Arabic reader’s review remain acceptance checks.
