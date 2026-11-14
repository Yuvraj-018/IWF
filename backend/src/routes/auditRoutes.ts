import { Router } from "express";
import { listAuditLogs, exportAuditLogs } from "../controllers/auditController.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const auditRouter = Router();

auditRouter.use(authenticate);

auditRouter.get("/", requirePermission("governance.audit_log:view"), listAuditLogs);
auditRouter.get("/export", requirePermission("governance.audit_log:export"), exportAuditLogs);

