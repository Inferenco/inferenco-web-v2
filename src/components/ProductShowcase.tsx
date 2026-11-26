import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { mediaProducts, type MediaProduct } from "../data/mediaProducts";
import { productPresentation, type ProductKey } from "../data/productPresentation";
import { StudioHandset } from "./StudioHandset";

type ProductImageProps = {
  image: { file: string; small?: { file: string; width: number }; width: number; height: number };
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductImage({ image, alt, priority, sizes }: ProductImageProps) {
  const directory = "/img/redesign/";
  return (
    <img
      className="studio-product-image"
      src={directory + image.file}
      srcSet={image.small ? `${directory}${image.small.file} ${image.small.width}w, ${directory}${image.file} ${image.width}w` : undefined}
      sizes={image.small ? sizes ?? "(max-width: 640px) 200px, 280px" : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

export function ProductPlatforms({ product, links = false }: { product: ProductKey; links?: boolean }) {
  const { t } = useTranslation("media");
  const { web, android, ios }: MediaProduct = mediaProducts[product];
  const available = [
    { href: web, label: links ? t("showcase.openWeb") : t("showcase.webPlatform") },
    { href: android, label: links ? t("common.googlePlay") : "Android" },
    { href: ios === "coming-soon" ? null : ios, label: links ? t("common.appStore") : "iOS" },
  ].filter((platform) => platform.href);

  return (
    <ul className={links ? "studio-actions" : "studio-platforms"} aria-label={t("showcase.platforms")}>
      {available.map(({ href, label }) => (
        <li key={label}>
          {links && href ? (
            <a className="studio-button" href={href}>
              {label} <span aria-hidden="true">↗</span>
            </a>
          ) : <bdi>{label}</bdi>}
        </li>
      ))}
      {links && ios === "coming-soon" && <li className="studio-platform-note">{t("modal.nemesis.note")}</li>}
    </ul>
  );
}

export function ProductCard({
  product,
  priority,
  compact,
  featured,
}: {
  product: ProductKey;
  priority?: boolean;
  compact?: boolean;
  featured?: boolean;
}) {
  const { t } = useTranslation("media");
  const { name, anchor, path, cover } = productPresentation[product];
  const Heading = compact ? "h3" : "h2";
  const variant = featured ? " studio-product-card--featured" : compact ? " studio-product-card--compact" : "";
  const linkName = anchor + "-link";
  const headingId = anchor + "-title";

  return (
    <article
      id={anchor}
      aria-labelledby={headingId}
      className={`studio-product-card studio-product-card--${product}${variant}`}
    >
      <div className="studio-card-caption studio-card-copy">
        {!featured && <p className="studio-eyebrow">{t(`showcase.${product}.category`)}</p>}
        <Heading id={headingId}><bdi>{name}</bdi></Heading>
      </div>
      <div className="studio-card-art">
        {featured ? (
          <StudioHandset product={product} alt={t(`showcase.${product}.cover`)} placement="teaser" />
        ) : (
          <ProductImage
            image={cover}
            alt={t(`showcase.${product}.cover`)}
            priority={priority}
            sizes={compact ? "(max-width: 355px) 224px, 192px" : "(max-width: 640px) 190px, (max-width: 980px) 230px, 292px"}
          />
        )}
      </div>
      <div className="studio-card-meta studio-card-copy">
        <p>{t(`showcase.${product}.intro`)}</p>
        <ProductPlatforms product={product} />
        <Link className="studio-arrow-link" to={path} aria-labelledby={compact ? `${linkName} ${headingId}` : linkName}>
          <span id={linkName}>
            {compact ? t(featured ? "showcase.explore" : "common.learnMore") : (
              <Trans ns="media" i18nKey="showcase.detailsLink" values={{ name }} components={{ product: <bdi /> }} />
            )}
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
