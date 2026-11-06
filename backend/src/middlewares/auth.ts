import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtils.js";

export interface AuthenticatedRequest extends Request {
  adminUser?: any;
}

/**
 * Middleware to require valid JWT admin authentication on protected routes.
 */
export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Missing Authorization header. Admin login required.",
    });
    return;
  }

  const { valid, payload } = verifyToken(authHeader);

  if (!valid || !payload) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired admin authentication session.",
    });
    return;
  }

  req.adminUser = payload;
  next();
}

