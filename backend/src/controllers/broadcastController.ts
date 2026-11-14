import { Response } from "express";
import { BroadcastCampaign } from "../models/BroadcastCampaign.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { getActor, logAudit } from "../services/auditService.js";

export async function listBroadcasts(req: RbacRequest, res: Response): Promise<void> {
  try {
    const data = await BroadcastCampaign.find({}).sort({ createdAt: -1 }).limit(100).lean();
    res.json({ success: true, data });
  } catch (error) {
    console.error("listBroadcasts error:", error);
    res.status(500).json({ success: false, message: "Failed to load broadcast history." });
  }
}

export async function createBroadcast(req: RbacRequest, res: Response): Promise<void> {
  try {
    const { title, targetAudience, recipientCount, channel, message } = req.body;
    if (!title || !targetAudience || !channel || !message) {
      res.status(400).json({ success: false, message: "Title, audience, channel and message are required." });
      return;
    }
    if (!["Email Newsletter", "SMS Alert", "WhatsApp Notice"].includes(channel)) {
      res.status(400).json({ success: false, message: "Unsupported broadcast channel." });
      return;
    }

    const campaign = await BroadcastCampaign.create({
      title: String(title).trim(),
      targetAudience: String(targetAudience).trim(),
      recipientCount: Math.max(0, Number(recipientCount) || 0),
      channel,
      message: String(message).trim(),
      status: "Queued",
      createdBy: req.adminUser?.id,
    });
    await logAudit({
      req,
      actor: getActor(req),
      action: "comms.broadcast:create",
      resourceType: "broadcast_campaign",
      resourceId: campaign.id,
      outcome: "success",
      after: campaign.toObject(),
    });
    res.status(201).json({ success: true, data: campaign });
  } catch (error) {
    console.error("createBroadcast error:", error);
    res.status(500).json({ success: false, message: "Failed to queue broadcast." });
  }
}
