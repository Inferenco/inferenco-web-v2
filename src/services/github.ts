export type OS = "windows" | "mac" | "linux" | "linux-arm64" | "unknown";

const REPO_OWNER = "Inferenco";
const REPO_NAME = "nova-desk-releases";

export const getLatestReleaseVersion = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`
    );
    const data = await response.json();
    return data.tag_name as string;
  } catch (error) {
    console.error("Failed to fetch latest version:", error);
    return "v0.1.1"; // Fallback
  }
};

export const getDownloadUrl = (os: OS, version: string): string => {
  const base = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${version}`;
  switch (os) {
    case "windows":
      return `${base}/NovaDesk-Windows-x64.exe`;
    case "linux":
      return `${base}/NovaDesk-x86_64.AppImage`;
    case "linux-arm64":
      return `${base}/NovaDesk-aarch64.AppImage`;
    case "mac":
    case "unknown":
    default:
      return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
  }
};