import { Response } from "express";
import { ProgrammeInitiative } from "../models/ProgrammeInitiative.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { getActor, logAudit } from "../services/auditService.js";

const allowedStatuses = new Set(["Active", "Upcoming", "Completed"]);

function scopeFilter(req: RbacRequest): Record<string, unknown> {
  const user = req.adminUser;
  if (!user || user.roles.includes("super_admin") || user.permissionsSet.has("*")) return {};
  const areas = user.scope.workAreas || [];
  return areas.length > 0 ? { sectorCode: { $in: areas.map((area) => area.toUpperCase()) } } : {};
}

export async function listInitiatives(req: RbacRequest, res: Response): Promise<void> {
  try {
    const filter: Record<string, unknown> = { ...scopeFilter(req) };
    if (req.query.sectorCode && req.query.sectorCode !== "all") {
      filter.sectorCode = String(req.query.sectorCode).toUpperCase();
    }
    if (req.query.search) {
      const search = String(req.query.search).trim();
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { leadOfficer: { $regex: search, $options: "i" } },
      ];
    }
    const data = await ProgrammeInitiative.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    console.error("listInitiatives error:", error);
    res.status(500).json({ success: false, message: "Failed to load programme initiatives." });
  }
}

export async function createInitiative(req: RbacRequest, res: Response): Promise<void> {
  try {
    const { title, sector, sectorCode, targetBeneficiaries, allocatedBudget, leadOfficer, status, progressPct } = req.body;
    if (!title || !sector || !sectorCode || !leadOfficer) {
      res.status(400).json({ success: false, message: "Title, sector, sector code and lead officer are required." });
      return;
    }
    if (status && !allowedStatuses.has(status)) {
      res.status(400).json({ success: false, message: "Invalid initiative status." });
      return;
    }
    const code = String(sectorCode).trim().toUpperCase();
    const user = req.adminUser;
    if (user && !user.roles.includes("super_admin") && !user.permissionsSet.has("*") &&
        user.scope.workAreas.length > 0 && !user.scope.workAreas.map((area) => area.toUpperCase()).includes(code)) {
      res.status(403).json({ success: false, message: "Initiative is outside your assigned work area." });
      return;
    }

    const initiative = await ProgrammeInitiative.create({
      title: String(title).trim(),
      sector: String(sector).trim(),
      sectorCode: code,
      targetBeneficiaries: Number(targetBeneficiaries) || 0,
      allocatedBudget: Number(allocatedBudget) || 0,
      leadOfficer: String(leadOfficer).trim(),
      status: status || "Active",
      progressPct: Number(progressPct) || 0,
      createdBy: user?.id,
    });
    await logAudit({
      req,
      actor: getActor(req),
      action: "programme.initiative:create",
      resourceType: "programme_initiative",
      resourceId: initiative.id,
      outcome: "success",
      after: initiative.toObject(),
    });
    res.status(201).json({ success: true, data: initiative });
  } catch (error) {
    console.error("createInitiative error:", error);
    res.status(500).json({ success: false, message: "Failed to create programme initiative." });
  }
}
