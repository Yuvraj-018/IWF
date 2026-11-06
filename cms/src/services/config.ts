/**
 * Production Client & Public URL Resolver
 * - Localhost dev: defaults to http://localhost:3000
 * - Production / Cloud: defaults to https://iwf-89zl.vercel.app (or custom domain)
 */
export function getClientUrl(): string {
  if (import.meta.env.VITE_CLIENT_URL) {
    return import.meta.env.VITE_CLIENT_URL.replace(/\/+$/, "");
  }

  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:3000";
  }

  return "https://iwf-89zl.vercel.app";
}
