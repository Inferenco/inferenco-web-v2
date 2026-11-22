import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LANGUAGE_ENDONYMS,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../i18n/languages";
import { setLanguage } from "../i18n";

/**
 * Compact globe toggle listing all 14 locales in the **registry order** of
 * `SUPPORTED_LANGUAGES` — the same order the Nemesis Go app picker uses.
 *
 * Entries are the **endonyms** (each language's name in that language), which
 * are locale-independent constants, so the list reads the same whatever the
 * current UI language is: a visitor who cannot read the current language must
 * still be able to find their own.
 */
export default function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = SUPPORTED_LANGUAGES.find((code) => code === i18n.resolvedLanguage) ?? "en";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const choose = async (code: SupportedLanguage) => {
    setOpen(false);
    if (code === current) return;
    await setLanguage(code);
  };

  return (
    <div
      className={`lang-switcher ${variant === "mobile" ? "lang-switcher-mobile" : ""}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="lang-switcher-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("aria.switchLanguage")}
        title={t("aria.currentLanguage", { language: LANGUAGE_ENDONYMS[current] })}
      >
        <i className="fas fa-globe" aria-hidden="true" />
        {/* Desktop stays icon-only to protect the single-row navbar contract;
            the mobile menu has room for the current endonym. */}
        {variant === "mobile" && (
          <span className="lang-switcher-current">{LANGUAGE_ENDONYMS[current]}</span>
        )}
      </button>
      {open && (
        <div className="lang-switcher-menu" role="listbox" aria-label={t("language.label")}>
          {SUPPORTED_LANGUAGES.map((code) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={code === current}
              className={`lang-switcher-item ${code === current ? "active" : ""}`}
              onClick={() => void choose(code)}
            >
              {LANGUAGE_ENDONYMS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
