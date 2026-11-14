import { Response } from "express";
import { AccessRequest } from "../models/AccessRequest.js";
import { Admin } from "../models/Admin.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { logAudit, getActor } from "../services/auditService.js";

/**
 * 1. Submit an Access Request (Any authenticated staff)
 */
export async function createAccessRequest(req: RbacRequest, res: Response) {
  try {
    const user = req.adminUser;
    if (!user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const { requestedResource, requestedPermission, moduleName, reason, accessType } = req.body;

    if (!requestedResource || !requestedPermission) {
      return res.status(400).json({
        success: false,
        message: "requestedResource and requestedPermission are required",
      });
    }

    // Check for existing pending request
    const existing = await AccessRequest.findOne({
      requesterId: user.id,
      requestedPermission,
      status: "pending",
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending access request for this permission.",
        data: existing,
      });
    }

    const primaryRole = Array.isArray(user.roles) && user.roles.length > 0 ? user.roles[0] : user.role || "Staff";

    const request = await AccessRequest.create({
      requesterId: user.id,
      requesterName: user.name,
      requesterEmail: user.email,
      requesterRole: primaryRole,
      requestedResource,
      requestedPermission,
      moduleName: moduleName || "System Module",
      reason: reason || "",
      accessType: accessType === "full" ? "full" : "read_only",
      status: "pending",
    });

    await logAudit({
      req,
      actor: getActor(req),
      action: "access_request.create",
      resourceType: "access_request",
      resourceId: request._id.toString(),
      outcome: "success",
      reason: `Requested access to ${requestedPermission} (${reason || "No reason specified"})`,
    });

    res.status(201).json({
      success: true,
      message: "Access request submitted successfully. A Super Admin has been notified.",
      data: request,
    });
  } catch (err: any) {
    console.error("createAccessRequest error:", err);
    res.status(500).json({ success: false, message: "Failed to submit access request", error: err.message });
  }
}

/**
 * 2. List Access Requests
 * Super Admins see all requests; standard staff see only their own requests.
 */
export async function listAccessRequests(req: RbacRequest, res: Response) {
  try {
    const user = req.adminUser;
    if (!user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const isManager =
      user.roles?.includes("super_admin") ||
      user.role === "superadmin" ||
      user.permissions?.includes("*") ||
      user.permissions?.includes("system.staff:edit");

    const { status } = req.query;
    const filter: Record<string, any> = {};

    if (!isManager) {
      filter.requesterId = user.id;
    }

    if (status && typeof status === "string" && status !== "all") {
      filter.status = status;
    }

    const requests = await AccessRequest.find(filter).sort({ createdAt: -1 }).limit(100);

    const pendingCount = await AccessRequest.countDocuments(
      isManager ? { status: "pending" } : { requesterId: user.id, status: "pending" }
    );

    res.json({
      success: true,
      data: requests,
      pendingCount,
    });
  } catch (err: any) {
    console.error("listAccessRequests error:", err);
    res.status(500).json({ success: false, message: "Failed to load access requests", error: err.message });
  }
}

/**
 * 3. Approve Access Request (Super Admin / Staff Manager)
 * Grants read-only or full permission directly to staff member.
 */
export async function approveAccessRequest(req: RbacRequest, res: Response) {
  try {
    const reviewer = req.adminUser;
    if (!reviewer) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const isManager =
      reviewer.roles?.includes("super_admin") ||
      reviewer.role === "superadmin" ||
      reviewer.permissions?.includes("*") ||
      reviewer.permissions?.includes("system.staff:edit");

    if (!isManager) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only Super Administrators can approve access requests.",
      });
    }

    const { id } = req.params;
    const { reviewNote } = req.body;

    const request = await AccessRequest.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Access request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Request has already been ${request.status}`,
      });
    }

    // Grant the permission directly to the requester
    const staff = await Admin.findById(request.requesterId);
    if (!staff) {
      return res.status(404).json({ success: false, message: "Requester account not found" });
    }

    if (!staff.directPermissions) {
      staff.directPermissions = { grant: [], deny: [] };
    }

    const permToGrant = request.requestedPermission;
    if (!staff.directPermissions.grant.includes(permToGrant)) {
      staff.directPermissions.grant.push(permToGrant);
    }

    await staff.save();

    request.status = "approved";
    request.reviewedBy = reviewer.id as any;
    request.reviewedByName = reviewer.name;
    request.reviewedAt = new Date();
    request.reviewNote = reviewNote || "Approved by Super Administrator";
    await request.save();

    await logAudit({
      req,
      actor: getActor(req),
      action: "access_request.approve",
      resourceType: "access_request",
      resourceId: request._id.toString(),
      outcome: "success",
      reason: `Approved ${request.requestedPermission} for ${staff.email}`,
    });

    res.json({
      success: true,
      message: `Access granted: ${request.requesterName} now has permission to access ${request.requestedPermission}.`,
      data: request,
    });
  } catch (err: any) {
    console.error("approveAccessRequest error:", err);
    res.status(500).json({ success: false, message: "Failed to approve access request", error: err.message });
  }
}

/**
 * 4. Reject Access Request (Super Admin / Staff Manager)
 */
export async function rejectAccessRequest(req: RbacRequest, res: Response) {
  try {
    const reviewer = req.adminUser;
    if (!reviewer) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const isManager =
      reviewer.roles?.includes("super_admin") ||
      reviewer.role === "superadmin" ||
      reviewer.permissions?.includes("*") ||
      reviewer.permissions?.includes("system.staff:edit");

    if (!isManager) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Only Super Administrators can reject access requests.",
      });
    }

    const { id } = req.params;
    const { reviewNote } = req.body;

    const request = await AccessRequest.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Access request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Request has already been ${request.status}`,
      });
    }

    request.status = "rejected";
    request.reviewedBy = reviewer.id as any;
    request.reviewedByName = reviewer.name;
    request.reviewedAt = new Date();
    request.reviewNote = reviewNote || "Request declined by Administrator";
    await request.save();

    await logAudit({
      req,
      actor: getActor(req),
      action: "access_request.reject",
      resourceType: "access_request",
      resourceId: request._id.toString(),
      outcome: "success",
      reason: `Declined ${request.requestedPermission} for ${request.requesterEmail}`,
    });

    res.json({
      success: true,
      message: "Access request declined.",
      data: request,
    });
  } catch (err: any) {
    console.error("rejectAccessRequest error:", err);
    res.status(500).json({ success: false, message: "Failed to reject access request", error: err.message });
  }
}
