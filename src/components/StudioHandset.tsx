import type { ProductKey } from "../data/productPresentation";

type StudioHandsetProps = {
  product: ProductKey;
  alt: string;
  placement?: "hero" | "teaser";
  priority?: boolean;
};

const assetPath = "/img/redesign/handset-";

export function StudioHandset({ product, alt, placement = "hero", priority }: StudioHandsetProps) {
  const teaser = placement === "teaser" && product !== "nemesis";
  const stem = assetPath + product + (teaser ? "-teaser" : "-hero");
  const narrow = teaser ? assetPath + product + "-mobile" : stem;
  const narrowFrame = narrow + (teaser ? "" : "-small");
  const narrowMedia = teaser ? "(max-width: 560px)" : "(max-width: 640px)";

  return (
    <picture className="studio-handset">
      <source media={narrowMedia} type="image/avif" srcSet={narrowFrame + ".avif"} width={420} height={700} />
      <source
        media={narrowMedia}
        srcSet={narrow + "-tiny.webp 300w, " + narrowFrame + ".webp 420w"}
        sizes="200px"
        width={420}
        height={700}
      />
      <img
        className="studio-handset-image"
        src={stem + ".webp"}
        srcSet={stem + "-small.webp 420w, " + stem + ".webp " + (teaser ? "840w" : "720w")}
        sizes={teaser ? "(max-width: 768px) 240px, 360px" : "(max-width: 640px) 210px, 300px"}
        width={teaser ? 840 : 720}
        height={teaser ? 1120 : 1200}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
      />
    </picture>
  );
}
