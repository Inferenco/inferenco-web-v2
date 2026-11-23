import { mediaProducts } from "./mediaProducts";

export const cataloguePath = "/games-and-apps/";

export const productKeys = ["nemesis", "sound", "resize"] as const;
export type ProductKey = (typeof productKeys)[number];

type Screenshot = {
  file: string;
  small?: { file: string; width: number };
  width: number;
  height: number;
};

type ProductPresentation = {
  name: string;
  path: string;
  anchor: string;
  cover: Screenshot;
  details: Screenshot[];
};

export const productPresentation = {
  nemesis: {
    name: mediaProducts.nemesis.name,
    path: cataloguePath + "nemesis-go/",
    anchor: "nemesis-go",
    cover: { file: "nemesis-match.webp", small: { file: "nemesis-match-small.webp", width: 384 }, width: 640, height: 1219 },
    details: [{ file: "nemesis-gameplay.webp", width: 640, height: 1290 }],
  },
  sound: {
    name: mediaProducts.sound.name,
    path: cataloguePath + "sound-flipper/",
    anchor: "sound-flipper",
    cover: { file: "sound-convert.webp", small: { file: "sound-convert-small.webp", width: 396 }, width: 648, height: 1152 },
    details: [{ file: "sound-edit.webp", width: 648, height: 1152 }],
  },
  resize: {
    name: mediaProducts.resize.name,
    path: cataloguePath + "resize-and-compress/",
    anchor: "image-fit",
    cover: { file: "resize-home.webp", small: { file: "resize-home-small.webp", width: 396 }, width: 648, height: 1152 },
    details: [
      { file: "resize-workspace.webp", width: 648, height: 1152 },
      { file: "resize-inspection.webp", width: 648, height: 1152 },
    ],
  },
} satisfies Record<ProductKey, ProductPresentation>;
