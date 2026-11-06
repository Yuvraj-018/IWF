/**
 * Client Website URL Resolver
 * Reads directly from VITE_CLIENT_URL environment variable.
 * - In local dev (.env): http://localhost:3000
 * - In production (.env / Hosting Environment Variables): https://iwf-89zl.vercel.app (or custom domain)
 */
export function getClientUrl(): string {
  const envUrl = (import.meta.env.VITE_CLIENT_URL as string)?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  // Fallback to localhost if running on local dev machine
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:3000";
  }

  return "";
}
