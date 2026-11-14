import { Router } from "express";
import {
  createAccessRequest,
  listAccessRequests,
  approveAccessRequest,
  rejectAccessRequest,
} from "../controllers/accessRequestController.js";
import { authenticate, requirePermission, requireReauth } from "../middlewares/rbac.js";

export const accessRequestRouter = Router();

// All access request endpoints require valid staff authentication
accessRequestRouter.use(authenticate);

accessRequestRouter.post("/", createAccessRequest);
accessRequestRouter.get("/", listAccessRequests);
accessRequestRouter.post("/:id/approve", requirePermission("system.staff:edit"), requireReauth(15), approveAccessRequest);
accessRequestRouter.post("/:id/reject", requirePermission("system.staff:edit"), requireReauth(15), rejectAccessRequest);
