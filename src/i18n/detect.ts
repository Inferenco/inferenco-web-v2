import {
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  matchLanguage,
  type SupportedLanguage,
} from "./languages";

/**
 * The key an **explicit** switcher choice is persisted under.
 *
 * Detection is never written here: a browser-language guess must not become a
 * sticky preference, so only `saveLanguage()` (called by the switcher) touches
 * storage.
 */
export const LOCALE_STORAGE_KEY = "inferenco.locale";

function readStored(): SupportedLanguage | null {
  if (typeof window === "undefined") return null;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    // Private mode / storage disabled — fall through to detection.
    return null;
  }
  if (typeof stored !== "string") return null;
  return isSupportedLanguage(stored) ? stored : null;
}

/**
 * The browser's own preference list, resolved through the registry ladder.
 *
 * `navigator.languages` is ordered by preference, so the **first entry that
 * maps to a supported locale wins** and an unsupported one (say `hi`) simply
 * falls through to the next candidate. Only when nothing in the list maps do
 * we land on English — a visitor whose browser says `['hi', 'de']` gets
 * German, not English.
 */
export function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return "en";
  const tags = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter((t): t is string => typeof t === "string");

  for (const tag of tags) {
    const matched = matchLanguage(tag);
    if (matched) return matched;
  }
  return "en";
}

/**
 * The locale the app should start in: an explicit, still-valid stored choice,
 * otherwise the browser preference, otherwise English.
 */
export function initialLanguage(): SupportedLanguage {
  return readStored() ?? detectBrowserLanguage();
}

/** Persist an explicit switcher choice. */
export function saveLanguage(language: SupportedLanguage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, language);
  } catch {
    // Storage disabled: the choice still applies for this session.
  }
}

export { SUPPORTED_LANGUAGES };
