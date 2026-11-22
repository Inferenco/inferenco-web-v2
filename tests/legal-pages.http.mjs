import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

// Localised legal documents: App Store Connect asks for a privacy/terms URL per
// language, so every supported locale emits `/nemesis-go/<lng>/<doc>/`.
// Spot-check a representative sample (Latin, CJK, Arabic script and the
// pt-BR/pt-PT variant pair) against the markdown sources that generated them.
const localeTags = { de: "de", "pt-BR": "pt-BR", "pt-PT": "pt-PT", zh: "zh", ar: "ar" };
const kinds = ["privacy", "terms"];
const sourceTitle = (lng, kind) =>
  /^# (.+)$/m.exec(readFileSync(`src/legal/nemesis-go/${lng}/${kind}.md`, "utf8"))[1];

for (const [lng, tag] of Object.entries(localeTags)) {
  for (const kind of kinds) {
    const other = kind === "privacy" ? "terms" : "privacy";
    const path = `/nemesis-go/${lng}/${kind}/`;

    test(`${path} serves the ${tag} ${kind} page`, async () => {
      for (const url of [path.slice(0, -1), path]) {
        const response = await fetch(origin + url);
        assert.equal(response.status, 200, url);

        const dom = new JSDOM(await response.text());
        try {
          const { document } = dom.window;
          const article = document.querySelector("main article");

          assert.equal(document.documentElement.getAttribute("lang"), tag, url);
          assert.equal(document.title, sourceTitle(lng, kind));
          assert.equal(article.querySelector("h1").textContent, sourceTitle(lng, kind));
          assert.equal(
            document.querySelector('link[rel="canonical"]').href,
            `https://inferenco.com${path}`,
          );

          // Translation-of-record note and the untranslated contacts.
          assert.ok(article.querySelector("blockquote"), `${url} missing translation note`);
          assert.ok(article.querySelector('a[href="mailto:singularityshift@inferenco.com"]'));
          assert.ok(article.querySelector('a[href="mailto:spielcrypto@inferenco.com"]'));

          // Prose is localised, not a copy of the English text.
          assert.ok(
            !article.textContent.includes(
              kind === "privacy"
                ? "This policy takes effect when published"
                : "These terms take effect when published",
            ),
            `${url} still carries the English body`,
          );

          // Related nav: same-locale sibling first, then the governing EN text.
          const related = [...document.querySelectorAll(".legal-related a")].map((a) =>
            a.getAttribute("href"),
          );
          assert.deepEqual(related, [`/nemesis-go/${lng}/${other}/`, `/nemesis-go/${other}/`]);
        } finally {
          dom.window.close();
        }
      }
    });
  }
}

test("the English pages stay on their canonical unlocalised paths", async () => {
  for (const kind of kinds) {
    const response = await fetch(origin + `/nemesis-go/${kind}/`);
    assert.equal(response.status, 200);
    const dom = new JSDOM(await response.text());
    try {
      const { document } = dom.window;
      assert.equal(document.documentElement.getAttribute("lang"), "en");
      assert.equal(
        document.querySelector('link[rel="canonical"]').href,
        `https://inferenco.com/nemesis-go/${kind}/`,
      );
      assert.deepEqual(
        [...document.querySelectorAll(".legal-related a")].map((a) => a.getAttribute("href")),
        [`/nemesis-go/${kind === "privacy" ? "terms" : "privacy"}/`],
      );
      assert.ok(!document.querySelector("main article blockquote"));
    } finally {
      dom.window.close();
    }
  }
});

test("pt-BR and pt-PT are distinct texts, not aliases", async () => {
  for (const kind of kinds) {
    const bodies = [];
    for (const lng of ["pt-BR", "pt-PT"]) {
      const response = await fetch(origin + `/nemesis-go/${lng}/${kind}/`);
      const dom = new JSDOM(await response.text());
      try {
        bodies.push(dom.window.document.querySelector("main article").textContent);
      } finally {
        dom.window.close();
      }
    }
    assert.notEqual(bodies[0], bodies[1], kind);
  }
});

test("unregistered legal locales return 404", async () => {
  for (const path of ["/nemesis-go/xx/privacy", "/nemesis-go/xx/terms", "/nemesis-go/pt/privacy/"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
  }
});
