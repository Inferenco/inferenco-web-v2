import assert from "node:assert/strict";
import { after, test } from "node:test";
import { JSDOM } from "jsdom";
import { preview } from "vite";

// Serve the actual build with static-host 404 behavior.
const server = await preview({
  appType: "mpa",
  logLevel: "error",
  preview: { host: "127.0.0.1", port: 0 },
});
after(() => server.close());

const { port } = server.httpServer.address();
const origin = `http://127.0.0.1:${port}`;

const pages = [
  {
    path: "/nemesis-go/privacy",
    title: "Nemesis Go Privacy Policy",
    copy: [
      "This policy takes effect when published and remains in effect until updated.",
      "We do not receive your moves or saved games through the app.",
      "We keep support emails for as long as needed to respond",
    ],
    related: "/nemesis-go/terms/",
  },
  {
    path: "/nemesis-go/terms",
    title: "Nemesis Go Terms of Use",
    copy: [
      "These terms take effect when published and remain in effect until updated.",
      "You may choose to complete an ad to reveal a hint or undo your last turn.",
      "Remove ads is an optional monthly subscription.",
    ],
    related: "/nemesis-go/privacy/",
  },
];

for (const { path, title, copy, related } of pages) {
  test(`${path} serves the ${title} as HTML on direct visits and reloads`, async () => {
    for (const url of [path, `${path}/`]) {
      const response = await fetch(origin + url);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type"), /^text\/html\b/);

      const dom = new JSDOM(await response.text());
      try {
        const { document } = dom.window;
        const article = document.querySelector("main article");

        assert.equal(document.title, title);
        assert.equal(article.querySelector("h1").textContent, title);
        for (const phrase of copy) assert.ok(article.textContent.includes(phrase), phrase);
        assert.ok(article.querySelector('a[href="mailto:singularityshift@inferenco.com"]'));
        assert.ok(article.querySelector('a[href="mailto:spielcrypto@inferenco.com"]'));
        assert.equal(document.querySelector(".legal-related a").getAttribute("href"), related);
        assert.equal(document.querySelector('link[rel="canonical"]').href, `https://inferenco.com${path}/`);
      } finally {
        dom.window.close();
      }
    }
  });
}

test("unregistered app policies return 404", async () => {
  for (const path of ["/unregistered-app/privacy", "/unregistered-app/terms", "/nemesis-go/cookies"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
  }
});
