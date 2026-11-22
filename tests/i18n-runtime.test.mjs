// Runtime acceptance for the browser-language requirement, exercised through
// the real i18n module (Vite SSR pipeline, same technique as
// tests/i18n-detect.test.mjs): the detected locale must already be translated
// at init time — no English flash — and a switcher choice must load its lazy
// catalogue and persist.
//
// This also pins the i18next v26 constraint that `addResourceBundle` /
// `hasResourceBundle` only exist on the instance *during* `init()`, so the
// pre-init preload must hand resources to `init()` instead of adding them.
import assert from "node:assert/strict";
import { after, test } from "node:test";
import { createServer } from "vite";

const vite = await createServer({
  configFile: false,
  server: { middlewareMode: true },
  appType: "custom",
});
after(() => vite.close());

const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");

after(() => {
  const restore = (name, descriptor) => {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  };
  restore("document", originalDocument);
  restore("window", originalWindow);
  restore("navigator", originalNavigator);
});

function stubBrowser({ languages, stored = null }) {
  const documentStub = { documentElement: { lang: "" } };
  const store = new Map(
    stored === null ? [] : [["inferenco.locale", stored]],
  );
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    writable: true,
    value: documentStub,
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    writable: true,
    value: {
      localStorage: {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => store.set(key, String(value)),
      },
    },
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    writable: true,
    value: { languages, language: languages[0] },
  });
  return { documentStub, store };
}

test("first visit paints in the browser language, with no English pre-paint", async () => {
  const { documentStub } = stubBrowser({ languages: ["de-AT", "de", "en"] });
  const mod = await vite.ssrLoadModule("/src/i18n/index.ts?de");
  const i18n = mod.default;

  await mod.initI18n();

  assert.equal(i18n.resolvedLanguage, "de");
  // Translated at init time, not after a catalogue fetch.
  assert.equal(i18n.t("chrome:nav.media"), "Medien & Unterhaltung");
  assert.equal(i18n.t("home:portfolio.divider"), "Onchain-Produkte");
  assert.equal(documentStub.documentElement.lang, "de");
});

test("an unsupported browser language renders English", async () => {
  const { documentStub } = stubBrowser({ languages: ["hi", "vi"] });
  const mod = await vite.ssrLoadModule("/src/i18n/index.ts?hi");
  const i18n = mod.default;

  await mod.initI18n();

  assert.equal(i18n.resolvedLanguage, "en");
  assert.equal(i18n.t("chrome:nav.media"), "Media & Entertainment");
  assert.equal(documentStub.documentElement.lang, "en");
});

test("a switcher choice loads its lazy catalogue, translates and persists", async () => {
  const { documentStub, store } = stubBrowser({ languages: ["en"] });
  const mod = await vite.ssrLoadModule("/src/i18n/index.ts?switch");
  const i18n = mod.default;

  await mod.initI18n();
  assert.equal(i18n.resolvedLanguage, "en");
  assert.equal(store.get("inferenco.locale"), undefined);

  await mod.setLanguage("kk");
  assert.equal(i18n.resolvedLanguage, "kk");
  assert.equal(i18n.t("chrome:nav.media"), "Медиа және ойын-сауық");
  assert.equal(i18n.t("home:portfolio.divider"), "Onchain өнімдер");
  assert.equal(documentStub.documentElement.lang, "kk");
  assert.equal(store.get("inferenco.locale"), "kk");

  // Interpolation and Trans markup still resolve in the new locale.
  assert.equal(
    i18n.t("chrome:aria.joinOn", { provider: "Telegram" }),
    "Telegram желісінде Inferenco-ға қосылыңыз",
  );
  assert.match(i18n.t("home:portfolio.title"), /<span>.*<\/span>/u);

  // Arabic stays in the LTR layout: lang changes, dir never does.
  await mod.setLanguage("ar");
  assert.equal(documentStub.documentElement.lang, "ar");
  assert.equal(documentStub.documentElement.dir, undefined);
});

test("pt-PT and pt-BR are distinct catalogues, not aliases", async () => {
  stubBrowser({ languages: ["pt"] });
  const mod = await vite.ssrLoadModule("/src/i18n/index.ts?pt");
  const i18n = mod.default;
  await mod.initI18n();

  assert.equal(i18n.resolvedLanguage, "pt-BR");
  const br = i18n.t("media:gallery.title");
  await mod.setLanguage("pt-PT");
  const pt = i18n.t("media:gallery.title");

  assert.notEqual(br, pt, "pt-PT must not be a copy of pt-BR");
  assert.equal(i18n.t("chrome:nav.docs"), "Documentação");
  assert.equal(br, "Jogos e aplicativos do dia a dia");
  assert.equal(pt, "Jogos e aplicações do dia a dia");
});
