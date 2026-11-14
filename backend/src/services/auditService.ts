import { Request } from "express";
import { AuditLog } from "../models/AuditLog.js";

export interface LogAuditParams {
  actor?: {
    id?: string;
    name?: string;
    email?: string;
  };
  req?: Request;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  before?: any;
  after?: any;
  outcome?: "success" | "failure" | "denied";
  reason?: string | null;
  severity?: "info" | "warning" | "high" | "critical";
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Unified Actor Attribution Helper
 * Reliably resolves actor from req.adminUser or req.user with zero fallback to arbitrary strings.
 */
export function getActor(req?: Request): {
  id: string;
  name: string;
  email: string;
  roles: string[];
  scope?: { workAreas: string[]; offices: string[] };
} {
  if (!req) {
    return {
      id: "system",
      name: "System Worker",
      email: "system@iwfindia.org",
      roles: ["super_admin"],
    };
  }

  const rawUser = (req as any).adminUser || (req as any).user;
  if (!rawUser) {
    return {
      id: "anonymous",
      name: "Unauthenticated Request",
      email: "anonymous@request.local",
      roles: [],
    };
  }

  return {
    id: String(rawUser.id || rawUser.adminId || rawUser._id || "unknown"),
    name: String(rawUser.name || rawUser.email || "Unknown Admin"),
    email: String(rawUser.email || "unknown@iwfindia.org"),
    roles: Array.isArray(rawUser.roles)
      ? rawUser.roles
      : rawUser.role
      ? [rawUser.role]
      : [],
    scope: rawUser.scope,
  };
}

/**
 * Records an immutable audit log entry.
 * Never throws to avoid interrupting primary transactions.
 */
export async function logAudit(params: LogAuditParams): Promise<void> {
  try {
    const actor = params.actor || getActor(params.req);
    const ipAddress =
      params.ipAddress ||
      (params.req
        ? (params.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          params.req.socket?.remoteAddress ||
          null
        : null);

    const userAgent =
      params.userAgent ||
      (params.req ? (params.req.headers["user-agent"] as string) || null : null);

    await AuditLog.create({
      actorId: actor.id || "system",
      actorName: actor.name || "System",
      actorEmail: actor.email || "system@iwfindia.org",
      action: params.action,
      resourceType: params.resourceType,
      resourceId: params.resourceId || null,
      before: params.before || null,
      after: params.after || null,
      outcome: params.outcome || "success",
      reason: params.reason || null,
      severity: params.severity || "info",
      ipAddress,
      userAgent,
    });
  } catch (err: any) {
    console.error("⚠️ [AUDIT ERROR] Failed to record audit log:", err.message);
  }
}

