export type OS = "windows" | "mac" | "mac-arm64" | "mac-intel" | "linux" | "linux-arm64" | "freebsd" | "unknown";

const REPO_OWNER = "Inferenco";
const REPO_NAME = "infer-desk-releases";
// Downloads are pinned to the published v0.6.2 release. Bump RELEASE_TAG
// when a new full release ships.
const RELEASE_TAG = "v0.6.2";
// v0.6.2 attaches the macOS zips (InferDesk-macOS-x86_64.zip /
// InferDesk-macOS-aarch64.zip) to the main release tag, signed + notarized.

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
      // detectOS never returns "mac"; keep the listing as a safe fallback.
      return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;
    case "mac-intel":
      return `${base}/InferDesk-macOS-x86_64.zip`;
    case "mac-arm64":
      return `${base}/InferDesk-macOS-aarch64.zip`;
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
