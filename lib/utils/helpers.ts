export function getSafeCallbackUrl(raw: string | null) {
  if (!raw) return "/";

  try {
    // allow only relative paths
    if (raw.startsWith("/") && !raw.startsWith("//")) {
      return raw;
    }

    // allow same-origin absolute URLs
    const url = new URL(raw);
    if (url.origin === window.location.origin) {
      return url.pathname + url.search;
    }
  } catch {}

  return "/";
}
