import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Role } from "../models/Role.js";
import { Admin } from "../models/Admin.js";
import { SYSTEM_ROLES } from "../config/permissions.js";
import { hashPassword } from "../utils/authUtils.js";
import { connectDB } from "../config/db.js";

export async function seedRbac(): Promise<{
  seededRoles: number;
  migratedAdmins: number;
  defaultAdminCreated: boolean;
}> {
  console.log("🚀 [RBAC SEED] Starting idempotent RBAC seeding and migration...");

  // 1. Seed or update all 13 system roles
  let seededRoles = 0;
  for (const roleDef of SYSTEM_ROLES) {
    await Role.findOneAndUpdate(
      { key: roleDef.key },
      {
        key: roleDef.key,
        name: roleDef.name,
        description: roleDef.description,
        permissions: roleDef.permissions,
        isSystem: true,
        requires2FA: roleDef.requires2FA,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    seededRoles++;
  }
  console.log(`✅ [RBAC SEED] ${seededRoles} system roles synchronized.`);

  // 2. Migrate existing Admin documents to RBAC schema
  const existingAdmins = await Admin.find({});
  let migratedAdmins = 0;

  for (const admin of existingAdmins) {
    let changed = false;

    // Migrate legacy roles
    if (!admin.roles || admin.roles.length === 0) {
      if (admin.role === "editor") {
        admin.roles = ["content_editor"];
      } else {
        admin.roles = ["super_admin"];
      }
      changed = true;
    } else {
      // Ensure superadmin role string is mapped to super_admin key
      if (admin.role === "superadmin" && !admin.roles.includes("super_admin")) {
        admin.roles.push("super_admin");
        changed = true;
      }
    }

    if (!admin.directPermissions) {
      admin.directPermissions = { grant: [], deny: [] };
      changed = true;
    }
    if (!admin.scope) {
      admin.scope = { workAreas: [], offices: [] };
      changed = true;
    }
    if (admin.tokenVersion === undefined || admin.tokenVersion === null) {
      admin.tokenVersion = 0;
      changed = true;
    }
    if (admin.failedLoginAttempts === undefined || admin.failedLoginAttempts === null) {
      admin.failedLoginAttempts = 0;
      changed = true;
    }
    if (admin.lockoutUntil === undefined) {
      admin.lockoutUntil = null;
      changed = true;
    }
    if (admin.mustChangePassword === undefined) {
      admin.mustChangePassword = false;
      changed = true;
    }
    if (admin.twoFactorEnabled === undefined) {
      admin.twoFactorEnabled = false;
      changed = true;
    }

    if (changed) {
      await admin.save();
      migratedAdmins++;
    }
  }
  console.log(`✅ [RBAC SEED] ${migratedAdmins} existing admin accounts migrated.`);

  // 3. Seed initial Superadmin if collection is completely empty
  let defaultAdminCreated = false;
  const totalAdmins = await Admin.countDocuments();
  if (totalAdmins === 0) {
    const defaultEmail = (process.env.DEFAULT_SUPERADMIN_EMAIL || process.env.ADMIN_EMAIL || "admin@iwfindia.org").toLowerCase().trim();
    const defaultPassword = process.env.DEFAULT_SUPERADMIN_PASSWORD || "Islah@Admin2026!";
    const defaultName = process.env.DEFAULT_SUPERADMIN_NAME || "ISLAH Superadmin";

    await Admin.create({
      email: defaultEmail,
      name: defaultName,
      passwordHash: hashPassword(defaultPassword),
      role: "superadmin",
      roles: ["super_admin"],
      directPermissions: { grant: [], deny: [] },
      scope: { workAreas: [], offices: [] },
      tokenVersion: 0,
      failedLoginAttempts: 0,
      mustChangePassword: false,
      twoFactorEnabled: false,
      isActive: true,
    });
    defaultAdminCreated = true;
    console.log(`⚡ [RBAC SEED] Created initial Superadmin account: ${defaultEmail}`);
  }

  return { seededRoles, migratedAdmins, defaultAdminCreated };
}

// Standalone execution support
if (process.argv[1]?.endsWith("seedRbac.ts") || process.argv[1]?.endsWith("seedRbac.js")) {
  (async () => {
    try {
      await connectDB();
      const result = await seedRbac();
      console.log("🎉 [RBAC SEED COMPLETE]", result);
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.error("❌ [RBAC SEED ERROR]:", err);
      process.exit(1);
    }
  })();
}

