import { Request, Response, NextFunction } from "express";
import { authenticate, requirePermission, requireReauth, getActor, RbacRequest } from "./rbac.js";

export { authenticate, requirePermission, requireReauth, getActor, RbacRequest };
export type { AdminUserContext } from "./rbac.js";

export interface AuthenticatedRequest extends RbacRequest {}

/**
 * Backward compatibility alias: requireAdminAuth maps directly to live authenticate
 */
export async function requireAdminAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  return authenticate(req as RbacRequest, res, next);
}
