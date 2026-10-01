/**
 * Normalizes asset URLs to be absolute by prepending the API base URL if needed.
 * Handles both absolute URLs (http/https) and relative URLs.
 */
export function getAssetUrl(publicUrl: string | null, apiBaseUrl: string): string | null {
  if (!publicUrl) return null;
  
  // If already an absolute URL (starts with http:// or https://), return as-is
  if (publicUrl.startsWith('http://') || publicUrl.startsWith('https://')) {
    return publicUrl;
  }
  
  // Otherwise, prepend the API base URL to make it absolute
  // Ensure apiBaseUrl doesn't end with / and publicUrl starts with /
  const base = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
  const url = publicUrl.startsWith('/') ? publicUrl : `/${publicUrl}`;
  
  return `${base}${url}`;
}
