import { Response } from "express";
import { VolunteerTask } from "../models/VolunteerTask.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { getActor, logAudit } from "../services/auditService.js";

export async function listVolunteerTasks(req: RbacRequest, res: Response): Promise<void> {
  try {
    const data = await VolunteerTask.find({}).sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, data });
  } catch (error) {
    console.error("listVolunteerTasks error:", error);
    res.status(500).json({ success: false, message: "Failed to load volunteer assignments." });
  }
}

export async function createVolunteerTask(req: RbacRequest, res: Response): Promise<void> {
  try {
    const {
      title,
      sector,
      location,
      volunteersRequired,
      assignedCount = 0,
      targetDate,
      leadCoordinator,
      status = "Upcoming",
    } = req.body;

    if (!title || !sector || !location || !targetDate || !leadCoordinator) {
      res.status(400).json({ success: false, message: "Title, sector, location, date and coordinator are required." });
      return;
    }

    const task = await VolunteerTask.create({
      title: String(title).trim(),
      sector: String(sector).trim(),
      location: String(location).trim(),
      volunteersRequired: Math.max(1, Number(volunteersRequired) || 1),
      assignedCount: Math.max(0, Number(assignedCount) || 0),
      targetDate: String(targetDate),
      leadCoordinator: String(leadCoordinator).trim(),
      status,
      createdBy: req.adminUser?.id,
    });

    await logAudit({
      req,
      actor: getActor(req),
      action: "volunteer.assignment:create",
      resourceType: "volunteer_task",
      resourceId: task.id,
      after: task.toObject(),
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error("createVolunteerTask error:", error);
    res.status(500).json({ success: false, message: "Failed to create volunteer assignment." });
  }
}
