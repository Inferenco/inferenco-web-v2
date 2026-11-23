import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ProductCard, ProductImage, ProductPlatforms } from "../components/ProductShowcase";
import { StudioHandset } from "../components/StudioHandset";
import { cataloguePath, productKeys, productPresentation, type ProductKey } from "../data/productPresentation";
import { currentLocaleTag, nemesisLegalUrl, supportUrl } from "../i18n";
import "./media-product.css";

const imageRoot = "/img/redesign/";

const resizeExamples = [
  { label: "before", file: "resize-hibiscus.webp", width: 960, height: 640, bytes: 75952 },
  { label: "after", file: "resize-hibiscus-output.webp", width: 320, height: 214, bytes: 10390 },
] as const;

const featureCrops = {
  nemesis: { file: "detail-go-board.webp", width: 640, height: 640 },
  sound: { file: "detail-sound-controls.webp", width: 640, height: 740 },
} as const;

function ResizeExample() {
  const { t } = useTranslation("media");
  const locale = currentLocaleTag();
  const dimension = new Intl.NumberFormat(locale, { useGrouping: false });
  const size = new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte", maximumFractionDigits: 1 });

  return (
    <section className="studio-container studio-resize-example product-comparison" aria-labelledby="resize-example">
      <h2 id="resize-example">{t("showcase.resize.example")}</h2>
      <div className="studio-resize-pair product-comparison-pair">
        {resizeExamples.map(({ label, file, width, height, bytes }) => (
          <figure key={label}>
            <ProductImage image={{ file, width, height }} alt={t("showcase.resize.examplePhoto")} />
            <figcaption>
              <strong>{t(`showcase.resize.${label}`)}</strong>
              <span><bdi>{dimension.format(width)} × {dimension.format(height)}</bdi> · {size.format(bytes / 1000)}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ProductProof({ product }: { product: ProductKey }) {
  const { t } = useTranslation("media");
  const { details } = productPresentation[product];

  return (
    <section className="studio-container studio-product-gallery product-proof" aria-labelledby="product-gallery">
      <div className="studio-product-gallery-copy product-proof-copy">
        <h2 id="product-gallery">{t(`showcase.${product}.feature`)}</h2>
        <p>{t(`showcase.${product}.detail`)}</p>
      </div>
      <div className="product-proof-images">
        {details.map((source, index) => {
          const view = product === "resize" ? source : featureCrops[product];
          const description = product === "nemesis" ? t("showcase.nemesis.boardDetail") : t(`showcase.${product}.screen${index + 1}`);
          return (
            <a className="product-proof-image" href={imageRoot + source.file} key={source.file}>
              <ProductImage image={view} alt={description} />
              <span aria-hidden="true" className="product-proof-expand">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8V3h5m9 9v5h-5M3 3l5 5m9 9-5-5" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>
      <ul className="studio-help-links product-proof-links">
        <li><a href={supportUrl()}>{t("footer.support", { ns: "chrome" })}</a></li>
        {product === "nemesis" && <>
          <li><a href={nemesisLegalUrl("privacy")}>{t("modal.nemesis.privacy")}</a></li>
          <li><a href={nemesisLegalUrl("terms")}>{t("modal.nemesis.terms")}</a></li>
        </>}
      </ul>
    </section>
  );
}

export default function MediaProduct({ product }: { product: ProductKey }) {
  const { t } = useTranslation("media");
  const { name } = productPresentation[product];

  return (
    <div className={`studio-page studio-detail studio-detail--${product}`}>
      <header className="studio-product-hero product-campaign">
        <div className="studio-container product-campaign-inner">
          <div className="studio-product-intro product-campaign-copy">
            <Link className="studio-arrow-link studio-back-link" to={cataloguePath}>
              <span aria-hidden="true">←</span> {t("showcase.collectionTitle")}
            </Link>
            <p className="studio-eyebrow">{t(`showcase.${product}.category`)}</p>
            <h1><bdi>{name}</bdi></h1>
            <p className="studio-lede">{t(`showcase.${product}.intro`)}</p>
            <ProductPlatforms product={product} links />
          </div>
          <div className="studio-hero-device product-campaign-art">
            {product === "sound" && <span className="product-signal-light" aria-hidden="true" />}
            <StudioHandset product={product} alt={t(`showcase.${product}.cover`)} priority />
          </div>
        </div>
      </header>

      {product === "resize" && <ResizeExample />}
      <ProductProof product={product} />

      <section className="studio-container studio-section" aria-labelledby="related-apps">
        <h2 id="related-apps" className="studio-eyebrow studio-section-label">{t("showcase.related")}</h2>
        <div className="studio-home-cards">
          {productKeys.filter((key) => key !== product).map((key) => <ProductCard key={key} product={key} compact />)}
        </div>
      </section>
    </div>
  );
}
