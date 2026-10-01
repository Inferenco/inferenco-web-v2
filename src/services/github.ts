export type OS = "windows" | "mac" | "mac-arm64" | "mac-intel" | "linux" | "linux-arm64" | "freebsd" | "unknown";

const REPO_OWNER = "Inferenco";
const REPO_NAME = "infer-desk-releases";
// Downloads are pinned to the published v0.6.0 release. Bump RELEASE_TAG
// when a new full release ships.
const RELEASE_TAG = "v0.6.0";
// macOS builds are not attached to RELEASE_TAG — they ship under a separate
// tag. Point macOS users at that tag's release page; the zip assets become
// directly downloadable there once they are attached.
const MACOS_RELEASE_TAG = "v0.6.0-macos";

export const getLatestReleaseVersion = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`
    );
    const data = await response.json();
    return data.tag_name as string;
  } catch (error) {
    console.error("Failed to fetch latest version:", error);
    return RELEASE_TAG; // Fallback
  }
};

export const getDownloadUrl = (os: OS): string => {
  const base = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${RELEASE_TAG}`;
  switch (os) {
    case "windows":
      return `${base}/InferDesk-Windows-x64.exe`;
    case "mac":
    case "mac-intel":
    case "mac-arm64":
      // macOS zips are published under MACOS_RELEASE_TAG, not RELEASE_TAG.
      return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/${MACOS_RELEASE_TAG}`;
    case "linux":
      return `${base}/InferDesk-x86_64.AppImage`;
    case "linux-arm64":
      return `${base}/InferDesk-aarch64.AppImage`;
    case "freebsd":
      return `${base}/InferDesk-FreeBSD-x86_64`;
    case "unknown":
    default:
      return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
  }
};
