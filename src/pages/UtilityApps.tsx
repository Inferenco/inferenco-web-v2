import { useState } from "react";
import { useTranslation } from "react-i18next";
import { mediaProducts } from "../data/mediaProducts";

type ActiveApp = "nemesis" | "resize" | "sound" | null;

// Product names, store names ("Google Play", "App Store") and file-format
// tokens are brands and technical identifiers: they stay verbatim in every
// locale. Everything a visitor reads as prose lives in the `media` namespace.
const apps = {
  nemesis: {
    key: "nemesis",
    name: mediaProducts.nemesis.name,
    legal: mediaProducts.nemesis.legal,
    links: [{ labelKey: "common.googlePlay", href: mediaProducts.nemesis.android }],
  },
  resize: {
    key: "resize",
    name: mediaProducts.resize.name,
    links: [
      { labelKey: "common.visitWebsite", href: mediaProducts.resize.web },
      { labelKey: "common.googlePlay", href: mediaProducts.resize.android },
    ],
  },
  sound: {
    key: "sound",
    name: mediaProducts.sound.name,
    links: [
      { labelKey: "common.visitWebsite", href: mediaProducts.sound.web },
      { labelKey: "common.googlePlay", href: mediaProducts.sound.android },
      { labelKey: "common.appStore", href: mediaProducts.sound.ios },
    ],
  },
} as const;

export default function UtilityApps() {
  const { t } = useTranslation("media");
  const [activeApp, setActiveApp] = useState<ActiveApp>(null);

  const close = () => setActiveApp(null);
  const app = activeApp ? apps[activeApp] : null;

  const tags = (product: string): string[] => t(`gallery.${product}.tags`, { returnObjects: true }) as string[];
  const features = (product: string): string[] => t(`modal.${product}.features`, { returnObjects: true }) as string[];

  return (
    <div id="utility-apps-page" className="page-section">
      <section className="hero infer-hero" role="banner">
        <div className="hero-content">
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.tagline")}</p>
          <div className="download-buttons">
            <a
              href={mediaProducts.nemesis.android}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              {t("hero.ctaNemesis")}
            </a>
            <a
              href={mediaProducts.sound.web}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              {t("hero.ctaSound")}
            </a>
            <a
              href={mediaProducts.resize.web}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              {t("hero.ctaImage")}
            </a>
          </div>
        </div>
      </section>

      <section id="utility-apps-gallery" className="section">
        <div className="container">
          <h2 className="section-title">{t("gallery.title")}</h2>
          <p className="section-subtitle">{t("gallery.subtitle")}</p>
          <div className="features-grid">
            {/* Nemesis Go Card */}
            <div className="feature-card portfolio-card" id="nemesis-go">
              <img
                src="/img/infer-ecosystem/utility-apps/nemesis-go-icon.webp"
                alt={t("gallery.nemesis.alt")}
                className="media-app-icon"
                loading="lazy"
                decoding="async"
                width="256"
                height="256"
              />
              <h4>{t("gallery.nemesis.name")}</h4>
              <p>{t("gallery.nemesis.blurb")}</p>
              <div className="portfolio-tags">
                {tags("nemesis").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href={mediaProducts.nemesis.android}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ marginTop: "1rem" }}
              >
                {t("common.googlePlay")}
              </a>
              <button
                onClick={() => setActiveApp("nemesis")}
                className="cta-button secondary"
                style={{ marginTop: "0.75rem" }}
              >
                {t("common.learnMore")}
              </button>
            </div>

            {/* Sound Flipper Card */}
            <div className="feature-card portfolio-card" id="sound-flipper">
              <img
                src="/img/infer-ecosystem/utility-apps/sound-flipper.png"
                alt={t("gallery.sound.alt")}
                className="utility-app-screenshot"
                loading="lazy"
                decoding="async"
                width="1200"
                height="630"
              />
              <h4>{t("gallery.sound.name")}</h4>
              <p>{t("gallery.sound.blurb")}</p>
              <div className="portfolio-tags">
                {tags("sound").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href={mediaProducts.sound.web}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ marginTop: "1rem" }}
              >
                {t("common.visitWebsite")}
              </a>
              <div className="download-buttons" style={{ marginTop: "0.75rem" }}>
                <a
                  href={mediaProducts.sound.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button secondary"
                >
                  {t("common.googlePlay")}
                </a>
                <a
                  href={mediaProducts.sound.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button secondary"
                >
                  {t("common.appStore")}
                </a>
              </div>
              <button
                onClick={() => setActiveApp("sound")}
                className="cta-button secondary"
                style={{ marginTop: "0.75rem" }}
              >
                {t("common.learnMore")}
              </button>
            </div>

            {/* Make My Image Fit Card */}
            <div className="feature-card portfolio-card" id="image-fit">
              <img
                src="/img/infer-ecosystem/utility-apps/resize-and-compress-image.png"
                alt={t("gallery.image.alt")}
                className="utility-app-screenshot"
                loading="lazy"
                decoding="async"
                width="1200"
                height="630"
              />
              <h4>{t("gallery.image.name")}</h4>
              <p>{t("gallery.image.blurb")}</p>
              <div className="portfolio-tags">
                {tags("image").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href={mediaProducts.resize.web}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ marginTop: "1rem" }}
              >
                {t("common.visitWebsite")}
              </a>
              <a
                href={mediaProducts.resize.android}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button secondary"
                style={{ marginTop: "0.75rem" }}
              >
                {t("common.googlePlay")}
              </a>
              <button
                onClick={() => setActiveApp("resize")}
                className="cta-button secondary"
                style={{ marginTop: "0.75rem" }}
              >
                {t("common.learnMore")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* App Details Modal */}
      {app && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={close} aria-label={t("common.close")}>
              <i className="fas fa-times"></i>
            </button>
            <h2>{app.name}</h2>
            <p>{t(`modal.${app.key}.long`)}</p>
            <div className="portfolio-tags">
              {features(app.key).map((feature) => (
                <span key={feature} className="tag">
                  {feature}
                </span>
              ))}
            </div>
            {app.links.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                {t(link.labelKey)}
              </a>
            ))}
            {"legal" in app && app.legal && (
              <div className="portfolio-tags" style={{ marginTop: "1rem" }}>
                <a href={app.legal.privacy}>{t("modal.nemesis.privacy")}</a>
                <a href={app.legal.terms}>{t("modal.nemesis.terms")}</a>
              </div>
            )}
            <p className="modal-note">{t(`modal.${app.key}.note`)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
