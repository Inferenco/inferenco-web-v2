import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsPage = readFileSync(resolve(root, "src/pages/Docs.tsx"), "utf8");
const inferConnectDocs = readFileSync(
  resolve(root, "src/pages/docs/InferConnectDocs.tsx"),
  "utf8"
);

function sectionIds(source) {
  return Array.from(source.matchAll(/<div id="([^"]+)"/g), (match) => match[1]);
}

describe("Infer Connect docs consistency", () => {
  test("every Infer Connect section has a unique sidebar link", () => {
    const ids = sectionIds(inferConnectDocs);
    assert.equal(new Set(ids).size, ids.length);

    for (const id of ids) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }
  });

  test("configuration table documents every InferWalletOptions field", () => {
    const options = [
      "deeplinkBaseUrl",
      "deeplinkScheme",
      "websiteUrl",
      "forceRegistration",
      "desktopRegistration",
      "detectAliases",
      "networkOverride",
      "fullnodeUrl",
      "bridgeBaseUrl",
      "relayBaseUrl",
      "websocketBaseUrl",
      "bridgeConnectTimeoutMs",
      "bridgePollIntervalMs",
      "bridgePollTimeoutMs",
      "mobilePollIntervalMs",
      "mobileRequestTimeoutMs",
      "mobileSocketTimeoutMs",
      "expectedOrigin",
      "sessionLivenessIntervalMs",
    ];

    for (const option of options) {
      assert.match(inferConnectDocs, new RegExp(`<code>${option}</code>`));
    }

    assert.match(inferConnectDocs, /https:\/\/inferenco\.com\/infer-desk/);
    assert.match(inferConnectDocs, /https:\/\/inferenco\.com\/infer-wallet/);
  });

  test("API, errors, providers, and storage docs include adapter source-of-truth details", () => {
    for (const token of [
      "signTransaction",
      "signAndSubmitBCSTransaction",
      "signMessageAndVerify",
      "refreshProvider",
      "subscribe",
      "createInferAIP62Wallet",
      "tryResumeInferWalletConnection",
      "remapInferError",
      "UNSUPPORTED",
      "window.cedra",
      "window.infer",
      "window.nova",
      "window.aptos",
      "isInferWallet",
      "isNovaWallet",
      "inferenco:infer-callback-marker",
      "inferenco:nova-callback-marker",
      "sessionStorage",
    ]) {
      assert.match(inferConnectDocs, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });
});
