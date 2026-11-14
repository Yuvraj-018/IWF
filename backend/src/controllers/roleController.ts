import { Response } from "express";
import { Role } from "../models/Role.js";
import { Admin } from "../models/Admin.js";
import { RbacRequest } from "../middlewares/rbac.js";
import { logAudit, getActor } from "../services/auditService.js";
import { PERMISSIONS, ALL_PERMISSION_KEYS } from "../config/permissions.js";

/**
 * 1. List All Roles with Active Assignment Counts
 */
export async function listRoles(req: RbacRequest, res: Response): Promise<void> {
  try {
    const roles = await Role.find({}).sort({ isSystem: -1, name: 1 }).lean();

    // Attach count of assigned staff to each role
    const rolesWithCounts = await Promise.all(
      roles.map(async (r) => {
        const assignedCount = await Admin.countDocuments({ roles: r.key });
        return {
          ...r,
          assignedCount,
        };
      })
    );

    res.json({ success: true, data: rolesWithCounts });
  } catch (error: any) {
    console.error("listRoles error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch roles", error: error.message });
  }
}

/**
 * 2. Get Permissions Registry (Dynamic source of truth for UI Matrix)
 */
export async function getPermissionsRegistry(_req: RbacRequest, res: Response): Promise<void> {
  try {
    // Group permissions by module
    const grouped: Record<string, typeof PERMISSIONS> = {};
    for (const p of PERMISSIONS) {
      if (!grouped[p.module]) {
        grouped[p.module] = [];
      }
      grouped[p.module].push(p);
    }

    res.json({
      success: true,
      data: {
        permissions: PERMISSIONS,
        groupedByModule: grouped,
        allKeys: ALL_PERMISSION_KEYS,
      },
    });
  } catch (error: any) {
    console.error("getPermissionsRegistry error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch permission registry", error: error.message });
  }
}

/**
 * 3. Create Custom Role
 */
export async function createRole(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { key, name, description, permissions = [], requires2FA = false } = req.body;

    if (!key || !name) {
      res.status(400).json({ success: false, message: "Role key and name are required." });
      return;
    }

    const cleanKey = String(key).trim().toLowerCase().replace(/\s+/g, "_");

    const existing = await Role.findOne({ key: cleanKey });
    if (existing) {
      res.status(400).json({ success: false, message: `Role with key "${cleanKey}" already exists.` });
      return;
    }

    // Escalation Guard: Cannot grant permissions you do not hold
    if (!actor?.roles?.includes("super_admin")) {
      const actorPerms: Set<string> = actor?.permissionsSet || new Set(actor?.permissions || []);
      const unheld = permissions.filter((p: string) => !actorPerms.has(p) && p !== "*");
      if (unheld.length > 0) {
        res.status(403).json({
          success: false,
          message: "Escalation guard violation: You cannot create a role with permissions you do not hold.",
          unheldPermissions: unheld,
        });
        return;
      }
    }

    const role = await Role.create({
      key: cleanKey,
      name: String(name).trim(),
      description: description ? String(description).trim() : "",
      permissions,
      isSystem: false,
      requires2FA: !!requires2FA,
    });

    await logAudit({
      req,
      action: "system.role:create",
      resourceType: "role",
      resourceId: role.key,
      severity: "info",
      after: { key: role.key, name: role.name, permissions: role.permissions },
    });

    res.status(201).json({ success: true, message: `Role "${role.name}" created successfully.`, data: role });
  } catch (error: any) {
    console.error("createRole error:", error);
    res.status(500).json({ success: false, message: "Failed to create role", error: error.message });
  }
}

/**
 * 4. Update Role Permissions & Metadata
 */
export async function updateRole(req: RbacRequest, res: Response): Promise<void> {
  try {
    const actor = req.adminUser;
    const { key } = req.params;
    const { name, description, permissions, requires2FA } = req.body;

    const role = await Role.findOne({ key });
    if (!role) {
      res.status(404).json({ success: false, message: `Role "${key}" not found.` });
      return;
    }

    // Escalation Guard: Cannot grant permissions you do not hold
    if (permissions && !actor?.roles?.includes("super_admin")) {
      const actorPerms: Set<string> = actor?.permissionsSet || new Set(actor?.permissions || []);
      const unheld = permissions.filter((p: string) => !actorPerms.has(p) && p !== "*");
      if (unheld.length > 0) {
        res.status(403).json({
          success: false,
          message: "Escalation guard violation: You cannot grant permissions you do not hold.",
          unheldPermissions: unheld,
        });
        return;
      }
    }

    const beforeState = {
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      requires2FA: role.requires2FA,
    };

    if (name) role.name = String(name).trim();
    if (description !== undefined) role.description = String(description).trim();
    if (permissions !== undefined) role.permissions = permissions;
    if (requires2FA !== undefined) role.requires2FA = !!requires2FA;

    await role.save();

    await logAudit({
      req,
      action: "system.role:edit",
      resourceType: "role",
      resourceId: role.key,
      severity: "high",
      before: beforeState,
      after: {
        name: role.name,
        description: role.description,
        permissions: role.permissions,
        requires2FA: role.requires2FA,
      },
      reason: `Role "${role.key}" updated by ${actor?.name}`,
    });

    res.json({ success: true, message: `Role "${role.name}" updated successfully.`, data: role });
  } catch (error: any) {
    console.error("updateRole error:", error);
    res.status(500).json({ success: false, message: "Failed to update role", error: error.message });
  }
}

/**
 * 5. Delete Custom Role (Blocked if system role or assigned to users)
 */
export async function deleteRole(req: RbacRequest, res: Response): Promise<void> {
  try {
    const { key } = req.params;

    const role = await Role.findOne({ key });
    if (!role) {
      res.status(404).json({ success: false, message: `Role "${key}" not found.` });
      return;
    }

    if (role.isSystem) {
      res.status(400).json({
        success: false,
        message: "System roles are fundamental to the platform and cannot be deleted.",
      });
      return;
    }

    const assignedCount = await Admin.countDocuments({ roles: key });
    if (assignedCount > 0) {
      res.status(400).json({
        success: false,
        message: `Cannot delete role "${role.name}" because it is currently assigned to ${assignedCount} staff member(s). Reassign them first.`,
      });
      return;
    }

    await Role.deleteOne({ _id: role._id });

    await logAudit({
      req,
      action: "system.role:delete",
      resourceType: "role",
      resourceId: String(key),
      severity: "high",
      reason: `Custom role "${role.name}" deleted`,
    });

    res.json({ success: true, message: `Role "${role.name}" deleted successfully.` });
  } catch (error: any) {
    console.error("deleteRole error:", error);
    res.status(500).json({ success: false, message: "Failed to delete role", error: error.message });
  }
}
