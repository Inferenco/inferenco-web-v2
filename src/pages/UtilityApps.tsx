import { useTranslation } from "react-i18next";
import { ProductCard } from "../components/ProductShowcase";
import { productKeys } from "../data/productPresentation";
import "./catalogue.css";

export default function UtilityApps() {
  const { t } = useTranslation("media");

  return (
    <div id="games-and-apps-page" className="studio-page studio-catalogue">
      <div className="studio-container">
        <header className="studio-catalogue-intro">
          <div className="studio-catalogue-heading">
            <p className="studio-eyebrow">{t("showcase.collectionTitle")}</p>
            <h1>{t("showcase.collectionHeadline")}</h1>
          </div>
          <p className="studio-lede">{t("showcase.collectionIntro")}</p>
        </header>
        <section id="games-and-apps-gallery" className="studio-catalogue-grid" aria-label={t("showcase.collectionTitle")}>
          {productKeys.map((product, index) => <ProductCard key={product} product={product} priority={index === 0} />)}
        </section>
      </div>
    </div>
  );
}
