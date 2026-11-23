export const siteOrigin = "https://inferenco.com";
export const defaultShareImage = "/img/redesign/inferenco-og.webp";

export type PageMetadata = {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
};

export const siteMetadata: Readonly<Record<string, PageMetadata>> = {
  "/": {
    title: "Inferenco | Independent Apps, Games & Media Tools",
    description: "Explore original games, useful apps and creative tools from Inferenco, an independent software partnership.",
  },
  "/games-and-apps/": {
    title: "Apps & Games | Inferenco",
    description: "Explore Nemesis Go, Sound Flipper and Image: Resize & Compress. Find each app’s supported platforms and store links.",
  },
  "/games-and-apps/nemesis-go/": {
    title: "Nemesis Go | Inferenco",
    description: "Play the strategy game of Go against an on-device opponent with Nemesis Go for Android.",
    image: "/img/redesign/nemesis-go-og.webp",
  },
  "/games-and-apps/sound-flipper/": {
    title: "Sound Flipper | Inferenco",
    description: "Convert, trim and edit audio with Sound Flipper. Find the web app and the Android and iOS downloads.",
    image: "/img/redesign/sound-flipper-og.webp",
  },
  "/games-and-apps/resize-and-compress/": {
    title: "Image: Resize & Compress | Inferenco",
    description: "Resize and compress images to fit your needs. Explore the web app and the Android download.",
    image: "/img/redesign/resize-and-compress-og.webp",
  },
  "/blogs/": {
    title: "Blogs | Inferenco",
    description: "Read releases, product updates and development stories from the Inferenco team.",
  },
  "/docs/": {
    title: "Documentation | Inferenco",
    description: "Guides and technical references for Infer Desk, Infer Wallet, Infer Connect, Infer MCP, Infer Bot and the Infer API.",
  },
  "/infer/": {
    title: "Infer Bot | Inferenco",
    description: "Explore Infer Bot and find its setup guides and documentation.",
  },
  "/infer-wallet/": {
    title: "Infer Wallet | Inferenco",
    description: "Discover Infer Wallet, browse its features and find platform downloads.",
  },
  "/infer-desk/": {
    title: "Infer Desk | Inferenco",
    description: "Discover Infer Desk, browse its features and find desktop downloads and guides.",
  },
  "/infer-mcp/": {
    title: "Infer MCP | Inferenco",
    description: "Learn about the Infer MCP bridge and find downloads and documentation for supported platforms.",
  },
};

export const notFoundMetadata: PageMetadata = {
  title: "Page not found | Inferenco",
  description: "The requested Inferenco page could not be found.",
};

export function canonicalPath(pathname: string): string {
  return pathname.endsWith("/") ? pathname : pathname + "/";
}
