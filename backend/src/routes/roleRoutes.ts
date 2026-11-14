import { Router } from "express";
import {
  listRoles,
  getPermissionsRegistry,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";
import { authenticate, requirePermission, requireReauth } from "../middlewares/rbac.js";

export const roleRouter = Router();

roleRouter.use(authenticate);

// Dynamic permission registry for frontend matrix
roleRouter.get("/permissions-registry", getPermissionsRegistry);

// Role CRUD operations
roleRouter.get("/", requirePermission("system.role:view"), listRoles);
roleRouter.post("/", requirePermission("system.role:create"), createRole);
roleRouter.put("/:key", requirePermission("system.role:edit"), requireReauth(15), updateRole);
roleRouter.delete("/:key", requirePermission("system.role:delete"), deleteRole);

