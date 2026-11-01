import type { Request, Response, NextFunction } from "express";

// Known vulnerability scanners and malicious automated probing tools
const BLOCKED_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /acunetix/i,
  /dirbuster/i,
  /nmap/i,
  /masscan/i,
  /wpscan/i,
  /zgrab/i,
  /havij/i,
  /nessus/i,
  /openvas/i,
];

/**
 * In-place sanitization that mutates the existing object without reassigning getter properties.
 * Compatible with Express 5's read-only IncomingMessage.prototype.query getters.
 */
function sanitizeInPlace(obj: any): void {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === "object") {
        sanitizeInPlace(obj[i]);
      }
    }
    return;
  }

  for (const key of Object.keys(obj)) {
    // Drop keys starting with '$' (e.g. $gt, $ne, $where) or containing '.' (field traversal)
    if (key.startsWith("$") || key.includes(".")) {
      console.warn(`[SECURITY] Stripped dangerous NoSQL key: "${key}"`);
      delete obj[key];
      continue;
    }
    const val = obj[key];
    if (val && typeof val === "object") {
      sanitizeInPlace(val);
    }
  }
}

/**
 * Security Middleware:
 * 1. Blocks automated vulnerability scanners by User-Agent
 * 2. Neutralizes NoSQL / Mongo Injection payloads safely in-place across req.body, req.query, and req.params
 */
export function securitySanitizer(req: Request, res: Response, next: NextFunction): void {
  try {
    // 1. Scanner User-Agent Check
    const ua = (req.headers["user-agent"] as string) || "";
    for (const pattern of BLOCKED_USER_AGENTS) {
      if (pattern.test(ua)) {
        console.warn(`[SECURITY BLOCK] Blocked scanner tool: "${ua}" from IP: ${req.ip}`);
        res.status(403).json({
          success: false,
          message: "Access forbidden.",
        });
        return;
      }
    }

    // 2. In-place NoSQL injection sanitization (never re-assigns getters like req.query in Express 5)
    if (req.body && typeof req.body === "object") {
      sanitizeInPlace(req.body);
    }

    if (req.query && typeof req.query === "object") {
      sanitizeInPlace(req.query);
    }

    if (req.params && typeof req.params === "object") {
      sanitizeInPlace(req.params);
    }
  } catch (err) {
    console.warn("[SECURITY SANITIZER ERROR (Bypassed gracefully)]:", err);
  }

  next();
}
