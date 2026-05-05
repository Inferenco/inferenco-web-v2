import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsPage = readFileSync(resolve(root, "src/pages/Docs.tsx"), "utf8");
const novaConnectDocs = readFileSync(
  resolve(root, "src/pages/docs/NovaConnectDocs.tsx"),
  "utf8"
);

function sectionIds(source) {
  return Array.from(source.matchAll(/<div id="([^"]+)"/g), (match) => match[1]);
}

describe("Nova Connect docs consistency", () => {
  test("every Nova Connect section has a unique sidebar link", () => {
    const ids = sectionIds(novaConnectDocs);
    assert.equal(new Set(ids).size, ids.length);

    for (const id of ids) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }
  });

  test("configuration table documents every NovaWalletOptions field", () => {
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
    ];

    for (const option of options) {
      assert.match(novaConnectDocs, new RegExp(`<code>${option}</code>`));
    }

    assert.match(novaConnectDocs, /https:\/\/inferenco\.com\/nova-desk/);
    assert.match(novaConnectDocs, /https:\/\/inferenco\.com\/nova-wallet/);
  });

  test("API, errors, providers, and storage docs include adapter source-of-truth details", () => {
    for (const token of [
      "signTransaction",
      "signAndSubmitBCSTransaction",
      "signMessageAndVerify",
      "refreshProvider",
      "subscribe",
      "createNovaAIP62Wallet",
      "tryResumeNovaWalletConnection",
      "remapNovaError",
      "UNSUPPORTED",
      "window.cedra",
      "window.aptos",
      "inferenco:nova-callback-marker",
      "sessionStorage",
    ]) {
      assert.match(novaConnectDocs, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });
});
