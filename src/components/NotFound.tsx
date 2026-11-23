import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">{t("notFound.title")}</h2>
        <p className="not-found-text">{t("notFound.text")}</p>
        <div className="not-found-links">
          <Link to="/" className="cta-button">
            {t("notFound.goHome")}
          </Link>
          <Link to="/docs" className="cta-button secondary">
            {t("notFound.browseDocs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
