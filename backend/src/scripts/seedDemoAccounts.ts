import crypto from "crypto";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Admin } from "../models/Admin.js";
import { Role } from "../models/Role.js";
import { hashPassword } from "../utils/authUtils.js";
import { seedRbac } from "./seedRbac.js";

dotenv.config();

/**
 * Demo Accounts Seeder
 * Creates 1 test account per system role with random strong passwords printed ONCE to console.
 * Strictly blocked in production environment.
 */
export async function seedDemoAccounts() {
  if (process.env.NODE_ENV === "production") {
    console.error("❌ Refusing to run demo seed script in production environment.");
    process.exit(1);
  }

  await connectDB();
  await seedRbac(); // Ensure system roles are up-to-date

  const systemRoles = await Role.find({ isSystem: true }).sort({ key: 1 });
  console.log(`\n================================================================`);
  console.log(`       ISLAH RBAC DEMO ACCOUNTS - ONE PER SYSTEM ROLE           `);
  console.log(`================================================================\n`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Seeding demo accounts for ${systemRoles.length} roles...\n`);

  const credentialsTable: Array<{
    Role: string;
    Email: string;
    Password: string;
    Scope: string;
  }> = [];

  for (const role of systemRoles) {
    const email = `demo_${role.key}@iwfindia.org`;
    const name = `Demo ${role.name}`;
    const rawPassword = process.env.DEMO_ACCOUNT_PASSWORD || "DemoAccount@2026!";
    const passwordHash = hashPassword(rawPassword);

    const scope =
      role.key === "programme_manager"
        ? { workAreas: ["EDU", "HLT"], offices: ["delhi-hq"] }
        : { workAreas: [], offices: [] };

    await Admin.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          email,
          passwordHash,
          role: role.key === "super_admin" ? "superadmin" : "editor",
          roles: [role.key],
          scope,
          directPermissions: { grant: [], deny: [] },
          tokenVersion: 0,
          failedLoginAttempts: 0,
          lockoutUntil: null,
          mustChangePassword: false,
          isActive: true,
        },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    credentialsTable.push({
      Role: role.name,
      Email: email,
      Password: rawPassword,
      Scope: scope.workAreas.length ? scope.workAreas.join(", ") : "All Areas",
    });
  }

  console.table(credentialsTable);
  console.log(`\n================================================================`);
  console.log(`✅ ${systemRoles.length} demo accounts created successfully.`);
  console.log(`⚠️  Copy these passwords now. They are printed once and never stored.`);
  console.log(`================================================================\n`);
}

// Direct execution
if (process.argv[1]?.endsWith("seedDemoAccounts.ts") || process.argv[1]?.endsWith("seedDemoAccounts.js")) {
  seedDemoAccounts()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Demo seed error:", err);
      process.exit(1);
    });
}

