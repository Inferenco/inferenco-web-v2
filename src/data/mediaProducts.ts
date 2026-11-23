// Store/web availability for Inferenco's media & everyday apps.
//
// Every URL here is a user-supplied, verified value — do not invent or
// "tidy" one. `ios: "coming-soon"` and `ios: null` are deliberate,
// asymmetric states: Nemesis Go has no App Store id yet (the game repo's
// `eas.ios.json` still carries the `ascAppId` placeholder), and Make My
// Image Fit has no iOS app at all, so neither may ever render an
// apps.apple.com link.
export interface MediaProduct {
  readonly name: string;
  readonly android: string | null;
  /** App Store URL, the literal `"coming-soon"`, or `null` for "no iOS app". */
  readonly ios: string | null;
  readonly web: string | null;
  readonly legal?: { readonly privacy: string; readonly terms: string };
}

export const mediaProducts = {
  nemesis: {
    name: "Nemesis Go",
    android: "https://play.google.com/store/apps/details?id=com.inferenco.nemesisgo",
    ios: "coming-soon",
    web: null,
    legal: {
      privacy: "/nemesis-go/privacy/",
      terms: "/nemesis-go/terms/",
    },
  },
  sound: {
    name: "Sound Flipper",
    android: "https://play.google.com/store/apps/details?id=com.soundflipper.app",
    ios: "https://apps.apple.com/app/sound-flipper/id6830835335",
    web: "https://www.soundflipper.com",
  },
  resize: {
    name: "Image: Resize & Compress",
    android: "https://play.google.com/store/apps/details?id=com.inferenco.imagefit",
    ios: null,
    web: "https://www.resizeandcompress.app",
  },
} as const satisfies Record<string, MediaProduct>;
