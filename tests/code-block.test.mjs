import assert from "node:assert/strict";
import { after, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const vite = await createServer({ configFile: false, server: { middlewareMode: true }, appType: "custom" });
after(() => vite.close());
const { default: CodeBlock } = await vite.ssrLoadModule("/src/components/CodeBlock.tsx");

test("code blocks label and highlight the selected language", () => {
  const typescript = renderToStaticMarkup(createElement(CodeBlock, { language: "typescript" }, 'const name = "Infer";'));
  const json = renderToStaticMarkup(createElement(CodeBlock, { language: "json" }, '{"name":"Infer"}'));
  const shell = renderToStaticMarkup(createElement(CodeBlock, { language: "bash" }, "pnpm add highlight.js"));
  const move = renderToStaticMarkup(createElement(CodeBlock, { language: "move" }, "struct UserProfile has key { value: u64 }"));

  assert.match(typescript, /data-language="TypeScript"/);
  assert.match(typescript, /hljs-keyword/);
  assert.match(json, /data-language="JSON"/);
  assert.match(json, /hljs-attr/);
  assert.match(shell, /data-language="Shell"/);
  assert.match(move, /data-language="Move"/);
  assert.match(move, /hljs-keyword/);
});

test("highlighted source is escaped before insertion as HTML", () => {
  const html = renderToStaticMarkup(createElement(CodeBlock, { language: "typescript" }, 'const unsafe = "<img src=x onerror=alert(1)>";'));
  assert.match(html, /&lt;img/);
  assert.doesNotMatch(html, /<img/);
});

test("copy control writes the original source and confirms success", async () => {
  const { JSDOM } = await import("jsdom");
  const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
  const globalNames = ["window", "document", "navigator", "HTMLElement", "Node"];
  const previous = new Map(globalNames.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  for (const name of globalNames) {
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value: dom.window[name] });
  }

  const source = 'const value = "<unsafe>";';
  let copied;
  Object.defineProperty(dom.window.navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (text) => { copied = text; } },
  });
  const { cleanup, fireEvent, render, screen, waitFor } = await import("@testing-library/react");

  try {
    render(createElement(CodeBlock, { language: "typescript" }, source));
    const button = screen.getByRole("button", { name: "Copy TypeScript code" });
    fireEvent.click(button);
    await waitFor(() => assert.equal(copied, source));
    await waitFor(() => assert.match(button.textContent, /Copied/));
  } finally {
    cleanup();
    dom.window.close();
    for (const name of globalNames) {
      const descriptor = previous.get(name);
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
});
