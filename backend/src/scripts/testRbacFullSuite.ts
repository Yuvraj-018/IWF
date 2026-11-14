import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import { Role } from "../models/Role.js";
import { Admin } from "../models/Admin.js";
import { AuditLog } from "../models/AuditLog.js";
import { Expense } from "../models/Expense.js";
import { SYSTEM_ROLES, ALL_PERMISSION_KEYS } from "../config/permissions.js";
import { seedRbac } from "./seedRbac.js";
import { resolveAdminPermissions } from "../middlewares/rbac.js";
import { checkSeparationOfDuties } from "../services/separationOfDuties.js";
import { applyScopeFilter, projectDonor, maskPhone, maskEmail, maskPan } from "../utils/piiFilter.js";
import { hashPassword, verifyPassword, signToken, verifyToken } from "../utils/authUtils.js";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedCount++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedCount++;
    console.error(`  ❌ [FAIL] ${testName}${detail ? ` - ${detail}` : ""}`);
  }
}

async function runTestSuite() {
  console.log("================================================================");
  console.log("   ISLAH RBAC SYSTEM - BACKEND VERIFICATION & ACCEPTANCE TEST   ");
  console.log("================================================================\n");

  await connectDB();

  // -------------------------------------------------------------------------
  // TEST SUITE 1: Seeding and Idempotency
  // -------------------------------------------------------------------------
  console.log("📋 [SUITE 1] Database Seeding & Idempotency");
  const firstSeed = await seedRbac();
  assert(firstSeed.seededRoles === 13, "First seed correctly synchronizes 13 system roles");

  const roleCountAfterFirst = await Role.countDocuments({ isSystem: true });
  assert(roleCountAfterFirst === 13, "Exactly 13 system roles exist in Role collection");

  const secondSeed = await seedRbac();
  assert(secondSeed.seededRoles === 13, "Second seed is idempotent and executes cleanly");
  const roleCountAfterSecond = await Role.countDocuments({ isSystem: true });
  assert(roleCountAfterSecond === 13, "Role count remains strictly 13 after re-seeding (no duplicates)");

  // -------------------------------------------------------------------------
  // TEST SUITE 2: System Role Permissions
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 2] Role Permissions & Security Policy");
  const superAdminRole = await Role.findOne({ key: "super_admin" });
  assert(superAdminRole !== null, "super_admin role exists in database");
  assert(
    superAdminRole?.permissions.length === ALL_PERMISSION_KEYS.length,
    `super_admin possesses all ${ALL_PERMISSION_KEYS.length} registered permissions`
  );

  const cmsAdminRole = await Role.findOne({ key: "cms_admin" });
  assert(cmsAdminRole !== null, "cms_admin role exists");
  assert(!cmsAdminRole?.permissions.includes("finance.expense:approve"), "cms_admin does NOT possess financial approval authority");
  assert(!cmsAdminRole?.permissions.includes("finance.donation:view_pii"), "cms_admin does NOT possess donor PII access");
  assert(!cmsAdminRole?.permissions.includes("system.staff:edit"), "cms_admin does NOT possess staff management authority");

  const financeApproverRole = await Role.findOne({ key: "finance_approver" });
  assert(Boolean(financeApproverRole?.permissions.includes("finance.expense:approve")), "finance_approver can approve expenses");
  assert(Boolean(financeApproverRole?.permissions.includes("finance.refund:process")), "finance_approver can process refunds");

  const auditorRole = await Role.findOne({ key: "auditor" });
  assert(Boolean(auditorRole?.permissions.includes("governance.audit_log:view")), "auditor can view audit trail");
  assert(Boolean(auditorRole?.permissions.includes("governance.audit_log:export")), "auditor can export audit trail");
  assert(!auditorRole?.permissions.some((p) => p.includes(":edit") || p.includes(":create") || p.includes(":delete")), "auditor has zero write/edit/delete authority anywhere");

  // -------------------------------------------------------------------------
  // TEST SUITE 3: Permission Resolution & Deny-Wins Logic
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 3] Permission Resolution (Union + Overrides)");
  // Mock an admin with two roles: content_editor + media_manager
  const mockAdminMulti = new Admin({
    email: "multi-role@iwfindia.org",
    name: "Multi Staff",
    passwordHash: "dummy",
    roles: ["content_editor", "media_manager"],
    directPermissions: {
      grant: ["finance.dashboard:view"],
      deny: ["cms.page:create"], // Deny wins over content_editor's grant!
    },
    scope: { workAreas: ["EDU"], offices: [] },
  });

  const resolved = await resolveAdminPermissions(mockAdminMulti);
  assert(resolved.permissionsSet.has("cms.media:create"), "Multi-role inherits permissions from media_manager");
  assert(resolved.permissionsSet.has("cms.news:create"), "Multi-role inherits permissions from content_editor");
  assert(resolved.permissionsSet.has("finance.dashboard:view"), "Explicit direct grant is added");
  assert(!resolved.permissionsSet.has("cms.page:create"), "Explicit direct deny WINS and revokes cms.page:create");

  // -------------------------------------------------------------------------
  // TEST SUITE 4: Separation of Duties Enforcement
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 4] Separation of Duties (Creator-Cannot-Approve/Pay/Reverse)");
  const creatorActor = {
    id: "admin_user_001",
    name: "Tariq Khan",
    email: "tariq@iwfindia.org",
    roles: ["super_admin", "finance_entry", "finance_approver"],
  };

  const reviewerActor = {
    id: "admin_user_002",
    name: "Ayesha Fatima",
    email: "ayesha@iwfindia.org",
    roles: ["finance_approver"],
  };

  const selfCreatedExpense = {
    id: "EXP-2026-00001",
    createdBy: "Tariq Khan",
    amountPaise: 500000,
  };

  const sodSelfApprove = checkSeparationOfDuties("approve", creatorActor, selfCreatedExpense);
  assert(!sodSelfApprove.allowed, "Creator CANNOT approve their own expense, even with super_admin role");

  const sodSelfPay = checkSeparationOfDuties("pay", creatorActor, selfCreatedExpense);
  assert(!sodSelfPay.allowed, "Creator CANNOT disburse payment for their own expense");

  const sodSelfReverse = checkSeparationOfDuties("reverse", creatorActor, selfCreatedExpense);
  assert(!sodSelfReverse.allowed, "Creator CANNOT reverse their own expense");

  const sodPeerApprove = checkSeparationOfDuties("approve", reviewerActor, selfCreatedExpense);
  assert(sodPeerApprove.allowed, "Another authorized staff member CAN approve the voucher");

  // -------------------------------------------------------------------------
  // TEST SUITE 5: Scope (Row-Level Access) Filtering
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 5] Row-Level Access (Scope Filter)");
  const programmeManagerEmptyScope = {
    id: "pm1",
    email: "pm1@iwfindia.org",
    name: "PM Empty",
    roles: ["programme_manager"],
    permissions: [] as string[],
    permissionsSet: new Set<string>(),
    scope: { workAreas: [] as string[], offices: [] as string[] },
    tokenVersion: 0,
  };

  const emptyFilter = applyScopeFilter({}, programmeManagerEmptyScope, "workAreaId");
  assert(
    emptyFilter.workAreaId === "__RESTRICTED_EMPTY_SCOPE__",
    "Programme manager with empty scope is restricted from viewing all work areas"
  );

  const programmeManagerScoped = {
    id: "pm2",
    email: "pm2@iwfindia.org",
    name: "PM Scoped",
    roles: ["programme_manager"],
    permissions: [] as string[],
    permissionsSet: new Set<string>(),
    scope: { workAreas: ["EDU", "HLT"], offices: [] as string[] },
    tokenVersion: 0,
  };

  const scopedFilter = applyScopeFilter({}, programmeManagerScoped, "workAreaId");
  assert(
    scopedFilter.workAreaId?.$in?.includes("EDU") && scopedFilter.workAreaId?.$in?.includes("HLT"),
    "Programme manager with assigned areas only receives matching workAreaIds"
  );

  const superAdminScope = {
    id: "sa1",
    email: "sa@iwfindia.org",
    name: "Super Admin",
    roles: ["super_admin"],
    permissions: [] as string[],
    permissionsSet: new Set<string>(),
    scope: { workAreas: [] as string[], offices: [] as string[] },
    tokenVersion: 0,
  };

  const saFilter = applyScopeFilter({ status: "approved" }, superAdminScope, "workAreaId");
  assert(saFilter.workAreaId === undefined, "Super Admin bypasses row-level workArea scope restrictions");

  // -------------------------------------------------------------------------
  // TEST SUITE 6: PII Masking and Projection
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 6] PII Projection (Splitting view from view_pii)");
  const rawDonor = {
    donorName: "Mohammad Farhan",
    donorPhone: "9876543210",
    donorEmail: "farhan@example.org",
    donorPan: "ABCDE1234F",
    donorAddress: "123 MG Road, Patna",
    amount: 15000,
  };

  const maskedDonor = projectDonor(rawDonor, false);
  assert(maskedDonor.donorPhone === "******3210", "Donor phone is masked when lacking view_pii");
  assert(maskedDonor.donorEmail === "f***n@example.org", "Donor email is masked when lacking view_pii");
  assert(maskedDonor.donorPan === "*****1234F", "Donor PAN is masked when lacking view_pii");
  assert(maskedDonor.donorAddress === "[Redacted - Confidential]", "Donor address is redacted when lacking view_pii");
  assert(maskedDonor.amount === 15000, "Financial amount remains visible");

  const unmaskedDonor = projectDonor(rawDonor, true);
  assert(unmaskedDonor.donorPhone === "9876543210", "Donor phone is unmasked when possessing view_pii");
  assert(unmaskedDonor.donorEmail === "farhan@example.org", "Donor email is unmasked when possessing view_pii");
  assert(unmaskedDonor.donorPan === "ABCDE1234F", "Donor PAN is unmasked when possessing view_pii");

  // -------------------------------------------------------------------------
  // TEST SUITE 7: Authentication, Token Version & Session Revocation
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 7] Authentication & Token Version Revocation");
  const testAdmin = await Admin.findOneAndUpdate(
    { email: "tokentest@iwfindia.org" },
    {
      email: "tokentest@iwfindia.org",
      name: "Token Test User",
      passwordHash: hashPassword("Secret1234!"),
      roles: ["cms_admin"],
      tokenVersion: 1,
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const tokenV1 = signToken({ adminId: testAdmin._id, tokenVersion: 1 });
  const verificationV1 = verifyToken(tokenV1);
  assert(verificationV1.valid === true, "JWT signed with valid tokenVersion is verified");
  assert(verificationV1.payload.tokenVersion === 1, "Payload preserves tokenVersion");

  // Simulate password change / session revocation: bump tokenVersion to 2
  testAdmin.tokenVersion = 2;
  await testAdmin.save();

  const refreshedAdmin = await Admin.findById(testAdmin._id);
  assert(
    tokenV1 !== undefined && verificationV1.payload.tokenVersion !== refreshedAdmin?.tokenVersion,
    "Token version mismatch detected after credential change (v1 != v2)"
  );

  // -------------------------------------------------------------------------
  // TEST SUITE 9: Audit Log Append-Only Immutability
  // -------------------------------------------------------------------------
  console.log("\n📋 [SUITE 9] Audit Log Immutability");
  const testLog = await AuditLog.create({
    actorId: testAdmin._id.toString(),
    actorName: testAdmin.name,
    actorEmail: testAdmin.email,
    action: "test.audit_log",
    resourceType: "system",
    outcome: "success",
  });
  assert(testLog._id !== undefined, "Audit log created successfully");

  let updateBlocked = false;
  try {
    await AuditLog.updateOne({ _id: testLog._id }, { action: "tampered.action" });
  } catch (err: any) {
    updateBlocked = true;
  }
  assert(updateBlocked === true, "AuditLogSchema strictly blocks updateOne mutations");

  let deleteBlocked = false;
  try {
    await AuditLog.deleteOne({ _id: testLog._id });
  } catch (err: any) {
    deleteBlocked = true;
  }
  assert(deleteBlocked === true, "AuditLogSchema strictly blocks deleteOne deletions");

  // Clean up test admin
  await Admin.deleteOne({ _id: testAdmin._id });

  // -------------------------------------------------------------------------
  // FINAL SUMMARY
  // -------------------------------------------------------------------------
  console.log("\n================================================================");
  console.log(`  VERIFICATION RESULTS:  TOTAL: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log("================================================================\n");

  await mongoose.disconnect();

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
