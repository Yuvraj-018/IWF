import { authEvents } from "./authEvents";
import { toast } from "sonner";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function getAuthHeaders(isFormData = false): HeadersInit {
  const token = localStorage.getItem("islah_admin_token");
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export function formatKolkataTime(dateStr?: string | Date): string {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateStr));
  } catch {
    return String(dateStr);
  }
}

/**
 * Central HTTP Client with automatic token injection,
 * token revocation detection, REAUTH_REQUIRED suspension & replay,
 * and standard error notifications.
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...getAuthHeaders(isFormData),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data: any;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  // 1. Session Revoked or 401 on authenticated endpoint
  if (response.status === 401) {
    if (data?.code === "TOKEN_REVOKED" || (headers as any)["Authorization"]) {
      authEvents.notifyTokenRevoked();
    }
    return data;
  }

  // 2. High-Risk Re-Authentication Challenge
  if (response.status === 403 && data?.code === "REAUTH_REQUIRED") {
    if (retryCount === 0) {
      try {
        // Suspend this call until the user completes the re-auth challenge
        const verified = await authEvents.requestReauth();
        if (verified) {
          // Replay the exact original request with updated headers
          return apiFetch<T>(endpoint, options, retryCount + 1);
        }
      } catch (err) {
        console.warn("Re-authentication challenge dismissed or cancelled", err);
      }
    }
    return data;
  }

  // 3. Permission Denied (403 Forbidden)
  if (response.status === 403 && data?.code === "FORBIDDEN") {
    toast.error(data?.message || "You do not have permission to perform this action.");
    return data;
  }

  // 4. Brute Force Account Lockout (423 Locked)
  if (response.status === 423) {
    const formattedUntil = data?.lockoutUntil ? formatKolkataTime(data.lockoutUntil) : "15 minutes";
    toast.error(`Account is locked until ${formattedUntil} (IST) due to repeated failed login attempts.`);
    return data;
  }

  return data;
}

