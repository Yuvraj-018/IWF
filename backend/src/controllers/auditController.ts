import { Response } from "express";
import { AuditLog } from "../models/AuditLog.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { logAudit, getActor } from "../services/auditService.js";

/**
 * 1. List Audit Logs with filtering and pagination
 */
export async function listAuditLogs(req: RbacRequest, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 25));
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (req.query.actor) {
      filter.$or = [
        { actorName: { $regex: String(req.query.actor), $options: "i" } },
        { actorEmail: { $regex: String(req.query.actor), $options: "i" } },
      ];
    }

    if (req.query.action && req.query.action !== "all") {
      filter.action = String(req.query.action);
    }

    if (req.query.resourceType && req.query.resourceType !== "all") {
      filter.resourceType = String(req.query.resourceType);
    }

    if (req.query.resourceId) {
      filter.resourceId = String(req.query.resourceId);
    }

    if (req.query.outcome && req.query.outcome !== "all") {
      filter.outcome = String(req.query.outcome);
    }

    if (req.query.severity && req.query.severity !== "all") {
      filter.severity = String(req.query.severity);
    }

    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        const end = new Date(req.query.endDate as string);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      AuditLog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("listAuditLogs error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch audit logs", error: error.message });
  }
}

/**
 * 2. Export Audit Logs to CSV
 */
export async function exportAuditLogs(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = getActor(req);
    const filter: any = {};

    if (req.query.action && req.query.action !== "all") filter.action = String(req.query.action);
    if (req.query.resourceType && req.query.resourceType !== "all") filter.resourceType = String(req.query.resourceType);
    if (req.query.outcome && req.query.outcome !== "all") filter.outcome = String(req.query.outcome);
    if (req.query.severity && req.query.severity !== "all") filter.severity = String(req.query.severity);

    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) filter.createdAt.$gte = new Date(req.query.startDate as string);
      if (req.query.endDate) {
        const end = new Date(req.query.endDate as string);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const logs = await AuditLog.find(filter).sort({ createdAt: -1 }).limit(5000).lean();

    // Generate CSV
    const headers = [
      "Timestamp (UTC)",
      "Timestamp (IST)",
      "Actor Name",
      "Actor Email",
      "Action",
      "Resource Type",
      "Resource ID",
      "Outcome",
      "Severity",
      "Reason",
      "IP Address",
    ];

    const rows = logs.map((log) => {
      const utcTime = log.createdAt.toISOString();
      const istTime = new Date(log.createdAt.getTime() + 5.5 * 3600 * 1000).toISOString().replace("Z", "+05:30");
      return [
        `"${utcTime}"`,
        `"${istTime}"`,
        `"${(log.actorName || "").replace(/"/g, '""')}"`,
        `"${(log.actorEmail || "").replace(/"/g, '""')}"`,
        `"${(log.action || "").replace(/"/g, '""')}"`,
        `"${(log.resourceType || "").replace(/"/g, '""')}"`,
        `"${(log.resourceId || "").replace(/"/g, '""')}"`,
        `"${log.outcome}"`,
        `"${log.severity}"`,
        `"${(log.reason || "").replace(/"/g, '""')}"`,
        `"${(log.ipAddress || "").replace(/"/g, '""')}"`,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");

    await logAudit({
      req,
      action: "governance.audit_log:export",
      resourceType: "audit_log",
      outcome: "success",
      reason: `Exported ${logs.length} audit log entries`,
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=audit-logs-${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (error: any) {
    console.error("exportAuditLogs error:", error);
    res.status(500).json({ success: false, message: "Failed to export audit logs", error: error.message });
  }
}

