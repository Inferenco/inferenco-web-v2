import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductShowcase";
import { StudioHandset } from "../components/StudioHandset";
import "./studio-home.css";
import { cataloguePath, productPresentation } from "../data/productPresentation";

const onchainLinks = [
  { name: "Infer Desk", path: "/infer-desk/" },
  { name: "Infer Wallet", path: "/infer-wallet/" },
  { name: "Infer MCP", path: "/infer-mcp/" },
  { name: "Infer Connect", path: "/docs/#infer-connect-introduction" },
  { name: "Infer Ecosystem", path: "https://app.inferenco.com" },
  { name: "Infer Bot", path: "/infer/" },
];

export default function Home() {
  const { t } = useTranslation("home");
  const { t: media } = useTranslation("media");
  const nemesis = productPresentation.nemesis;

  return (
    <div className="studio-page studio-home">
      <section className="studio-home-hero">
        <div className="studio-container studio-home-hero-inner">
          <div className="studio-home-intro">
            <p className="studio-eyebrow">{t("studio.eyebrow")}</p>
            <h1>
              <span className="studio-home-title-line">{t("studio.headline")}</span>{" "}
              <span className="studio-home-title-line">
                <Trans t={t} i18nKey="studio.accent" components={{ emphasis: <em /> }} />
              </span>
            </h1>
            <p className="studio-lede">{t("studio.intro")}</p>
            <div className="studio-actions">
              <Link className="studio-button" to={cataloguePath}>{t("studio.explore")}</Link>
              <Link className="studio-arrow-link" to="/#about">{t("studio.story")}</Link>
            </div>
          </div>
          <Link className="studio-home-feature" to={nemesis.path}>
            <div className="studio-home-device">
              <StudioHandset product="nemesis" alt="" priority />
            </div>
            <div className="studio-home-caption">
              <p><bdi>{nemesis.name}</bdi></p>
              <span>{media("showcase.nemesis.intro")}</span>
            </div>
          </Link>
        </div>
      </section>

      <section id="portfolio" className="studio-container studio-section" aria-labelledby="home-apps">
        <h2 id="home-apps" className="studio-eyebrow studio-section-label">{t("studio.more")}</h2>
        <div className="studio-home-cards">
          <ProductCard product="sound" compact featured />
          <ProductCard product="resize" compact featured />
        </div>
      </section>

      <section id="about" className="studio-container studio-story">
        <h2>{t("studio.story")}</h2>
        <div>
          <p>{t("studio.partners")}</p>
          <Link className="studio-arrow-link" to="/blogs/">
            {t("nav.blogs", { ns: "chrome" })} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section id="onchain" className="studio-container studio-home-onchain" aria-labelledby="home-onchain">
        <h2 id="home-onchain">{t("portfolio.divider")}</h2>
        <ul>
          {onchainLinks.map(({ name, path }) => (
            <li key={name}>
              {path.startsWith("/") ? <Link to={path}><bdi>{name}</bdi></Link> : <a href={path}><bdi>{name}</bdi></a>}
            </li>
          ))}
        </ul>
        <Link className="studio-arrow-link" to="/docs/">
          {t("footer.documentation", { ns: "chrome" })} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
