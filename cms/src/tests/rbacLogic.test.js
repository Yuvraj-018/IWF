import assert from "node:assert/strict";
import test from "node:test";

// 1. Permission Evaluation & Wildcard Logic Test
function evaluatePermission(userPermissions, requiredPermission) {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (userPermissions.includes("*")) return true;
  return userPermissions.includes(requiredPermission);
}

function evaluateAnyPermission(userPermissions, permissions) {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (userPermissions.includes("*")) return true;
  return permissions.some((p) => userPermissions.includes(p));
}

function evaluateAllPermissions(userPermissions, permissions) {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (userPermissions.includes("*")) return true;
  return permissions.every((p) => userPermissions.includes(p));
}

// 2. Separation of Duties Creator Guard
function checkSeparationOfDuties(currentUser, record) {
  const isCreator = Boolean(
    (record.creatorId && record.creatorId === currentUser.id) ||
    (record.requestedBy && (
      record.requestedBy.toLowerCase() === currentUser.email?.toLowerCase() ||
      record.requestedBy.toLowerCase() === currentUser.name?.toLowerCase()
    )) ||
    (record.createdBy && (
      record.createdBy.toLowerCase() === currentUser.email?.toLowerCase() ||
      record.createdBy.toLowerCase() === currentUser.name?.toLowerCase()
    ))
  );

  return {
    isCreator,
    disabled: isCreator,
    disabledReason: isCreator ? "You created this record, so another person must act on it." : null,
  };
}

// 3. Asia/Kolkata Lockout Time Formatter
function formatLockoutTime(isoString) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoString));
}

// 4. Scope Evaluation
function inScope(userScope, workArea, office) {
  if (!userScope) return true;
  if (workArea && userScope.workAreas && userScope.workAreas.length > 0) {
    if (!userScope.workAreas.includes(workArea)) return false;
  }
  if (office && userScope.offices && userScope.offices.length > 0) {
    if (!userScope.offices.includes(office)) return false;
  }
  return true;
}

test("Wildcard permission grants access to any permission", () => {
  const superAdminPerms = ["*"];
  assert.equal(evaluatePermission(superAdminPerms, "finance.expense:approve"), true);
  assert.equal(evaluatePermission(superAdminPerms, "cms.news:delete"), true);
  assert.equal(evaluatePermission(superAdminPerms, "staff.account:create"), true);
});

test("Granular permissions evaluate accurately", () => {
  const accountantPerms = ["finance.expense:create", "finance.expense:read", "finance.budget:view"];
  assert.equal(evaluatePermission(accountantPerms, "finance.expense:create"), true);
  assert.equal(evaluatePermission(accountantPerms, "finance.expense:approve"), false);
  assert.equal(evaluatePermission(accountantPerms, "cms.news:delete"), false);
});

test("hasAny and hasAll logic works properly", () => {
  const editorPerms = ["cms.news:create", "cms.news:read"];
  assert.equal(evaluateAnyPermission(editorPerms, ["cms.news:create", "cms.media:create"]), true);
  assert.equal(evaluateAnyPermission(editorPerms, ["finance.expense:create", "finance.budget:manage"]), false);
  assert.equal(evaluateAllPermissions(editorPerms, ["cms.news:create", "cms.news:read"]), true);
  assert.equal(evaluateAllPermissions(editorPerms, ["cms.news:create", "cms.news:publish"]), false);
});

test("Separation of duties disables creator approval with exact mandated reason", () => {
  const currentUser = { id: "user-123", name: "Ahmad Khan", email: "ahmad@islah.org" };
  const recordCreatedByMe = { id: "exp-001", creatorId: "user-123", amount: 50000 };
  const recordCreatedByOther = { id: "exp-002", creatorId: "user-999", requestedBy: "Fatima Noor", amount: 30000 };

  const checkOwn = checkSeparationOfDuties(currentUser, recordCreatedByMe);
  assert.equal(checkOwn.disabled, true);
  assert.equal(checkOwn.disabledReason, "You created this record, so another person must act on it.");

  const checkOther = checkSeparationOfDuties(currentUser, recordCreatedByOther);
  assert.equal(checkOther.disabled, false);
  assert.equal(checkOther.disabledReason, null);
});

test("Separation of duties matches display name and email case-insensitively", () => {
  const currentUser = { id: "user-456", name: "Fatima Noor", email: "fatima@islah.org" };
  const recordWithEmail = { id: "exp-003", requestedBy: "FATIMA@ISLAH.ORG" };
  const recordWithName = { id: "exp-004", createdBy: "fatima noor" };

  assert.equal(checkSeparationOfDuties(currentUser, recordWithEmail).disabled, true);
  assert.equal(checkSeparationOfDuties(currentUser, recordWithName).disabled, true);
});

test("Asia/Kolkata lockout time formatting", () => {
  const sampleLockoutTime = "2026-11-14T12:00:00.000Z"; // 17:30 IST
  const formatted = formatLockoutTime(sampleLockoutTime);
  assert.match(formatted, /5:30/);
});

test("Work Area and Office scoping", () => {
  const scopedUser = {
    workAreas: ["HLT", "EDU"],
    offices: ["HQ", "DARBHANGA"],
  };

  assert.equal(inScope(scopedUser, "HLT", "HQ"), true);
  assert.equal(inScope(scopedUser, "AGR", "HQ"), false); // outside work area
  assert.equal(inScope(scopedUser, "HLT", "PATNA"), false); // outside office
});
