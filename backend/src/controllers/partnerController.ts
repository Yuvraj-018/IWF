import { Response } from "express";
import { PartnerAgreement } from "../models/PartnerAgreement.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { getActor, logAudit } from "../services/auditService.js";

export async function listPartnerAgreements(req: RbacRequest, res: Response): Promise<void> {
  try {
    const data = await PartnerAgreement.find({}).sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, data });
  } catch (error) {
    console.error("listPartnerAgreements error:", error);
    res.status(500).json({ success: false, message: "Failed to load partner agreements." });
  }
}

export async function createPartnerAgreement(req: RbacRequest, res: Response): Promise<void> {
  try {
    const {
      partnerName,
      partnerType,
      agreementRef,
      focusArea,
      committedGrant,
      signedDate,
      expiryDate,
      mouDocUrl,
      status = "Active",
    } = req.body;

    if (!partnerName || !partnerType || !agreementRef || !focusArea || !signedDate || !expiryDate) {
      res.status(400).json({ success: false, message: "Partner, type, reference, focus area and dates are required." });
      return;
    }

    const agreement = await PartnerAgreement.create({
      partnerName: String(partnerName).trim(),
      partnerType,
      agreementRef: String(agreementRef).trim(),
      focusArea: String(focusArea).trim(),
      committedGrant: Math.max(0, Number(committedGrant) || 0),
      signedDate: String(signedDate),
      expiryDate: String(expiryDate),
      mouDocUrl: mouDocUrl ? String(mouDocUrl).trim() : undefined,
      status,
      createdBy: req.adminUser?.id,
    });

    await logAudit({
      req,
      actor: getActor(req),
      action: "partner.agreement:create",
      resourceType: "partner_agreement",
      resourceId: agreement.id,
      after: agreement.toObject(),
    });

    res.status(201).json({ success: true, data: agreement });
  } catch (error: any) {
    console.error("createPartnerAgreement error:", error);
    if (error?.code === 11000) {
      res.status(409).json({ success: false, message: "Agreement reference already exists." });
      return;
    }
    res.status(500).json({ success: false, message: "Failed to create partner agreement." });
  }
}
