import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("move", (language) => ({
  name: "Move",
  keywords: {
    keyword: "module use friend public entry fun struct has key store copy drop acquires let mut if else while loop return abort break continue as",
    literal: "true false",
    type: "bool u8 u16 u32 u64 u128 u256 address vector signer",
  },
  contains: [language.C_LINE_COMMENT_MODE, language.C_BLOCK_COMMENT_MODE, language.QUOTE_STRING_MODE, language.C_NUMBER_MODE],
}));

type CodeLanguage = "bash" | "json" | "move" | "typescript";

const labels: Record<CodeLanguage, string> = {
  bash: "Shell",
  json: "JSON",
  move: "Move",
  typescript: "TypeScript",
};

export default function CodeBlock({ children, language }: { children: string; language: CodeLanguage }) {
  const label = labels[language];
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  async function copyCode() {
    if (resetTimer.current) clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(children);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
  }

  const copyLabel = copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy";

  return (
    <pre className="code-block highlighted-code" data-language={label} aria-label={`${label} code example`}>
      <button type="button" className="code-copy-button" onClick={copyCode} aria-label={`${copyLabel} ${label} code`}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <span>{copyLabel}</span>
      </button>
      <code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: hljs.highlight(children, { language }).value }} />
    </pre>
  );
}
