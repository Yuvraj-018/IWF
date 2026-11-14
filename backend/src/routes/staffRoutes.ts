import { Router } from "express";
import {
  listStaff,
  getStaffById,
  inviteStaff,
  updateStaff,
  resendInvite,
  resetStaffCredentials,
  deactivateStaff,
  reactivateStaff,
  forceSignOut,
} from "../controllers/staffController.js";
import { authenticate, requirePermission, requireReauth } from "../middlewares/rbac.js";

export const staffRouter = Router();

staffRouter.use(authenticate);

// Staff management operations
staffRouter.get("/", requirePermission("system.staff:view"), listStaff);
staffRouter.get("/:id", requirePermission("system.staff:view"), getStaffById);
staffRouter.post("/invite", requirePermission("system.staff:create"), inviteStaff);
staffRouter.put("/:id", requirePermission("system.staff:edit"), requireReauth(15), updateStaff);
staffRouter.post("/:id/resend-invite", requirePermission("system.staff:create"), resendInvite);
staffRouter.post("/:id/reset-password", requirePermission("system.staff:edit"), resetStaffCredentials);
staffRouter.post("/:id/deactivate", requirePermission("system.staff:delete"), deactivateStaff);
staffRouter.post("/:id/reactivate", requirePermission("system.staff:edit"), reactivateStaff);
staffRouter.post("/:id/force-signout", requirePermission("system.staff:edit"), forceSignOut);

