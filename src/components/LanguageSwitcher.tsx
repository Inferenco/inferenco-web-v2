import { useTranslation } from "react-i18next";
import {
  LANGUAGE_ENDONYMS,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../i18n/languages";
import { setLanguage } from "../i18n";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = SUPPORTED_LANGUAGES.find((code) => code === i18n.resolvedLanguage) ?? "en";

  return (
    <label className="studio-language studio-icon-button">
      <i className="fas fa-globe" aria-hidden="true" />
      <select
        aria-label={t("aria.switchLanguage")}
        title={t("aria.currentLanguage", { language: LANGUAGE_ENDONYMS[current] })}
        value={current}
        onChange={(event) => void setLanguage(event.currentTarget.value as SupportedLanguage)}
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <option key={code} value={code} lang={code}>{LANGUAGE_ENDONYMS[code]}</option>
        ))}
      </select>
    </label>
  );
}
