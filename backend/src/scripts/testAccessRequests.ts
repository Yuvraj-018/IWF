import assert from "assert";

const BASE_URL = "http://localhost:5000/api";

async function run() {
  console.log("=== ACCESS REQUEST & APPROVAL END-TO-END TEST ===");

  // 1. Log in as Finance Approver
  console.log("\n1. Logging in as Finance Approver (demo_finance_approver@iwfindia.org)...");
  const approverLoginRes = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "demo_finance_approver@iwfindia.org",
      password: "DemoAccount@2026!",
    }),
  });
  const approverLogin = (await approverLoginRes.json()) as any;
  console.log("Login response:", approverLogin);
  assert(approverLogin.success, `Approver login failed: ${approverLogin.message}`);
  const approverToken = approverLogin.token;
  console.log("✅ Finance Approver logged in successfully. ID:", approverLogin.admin?.id || approverLogin.data?._id);

  // 2. Log in as Super Admin
  console.log("\n2. Logging in as Super Admin (admin@iwfindia.org)...");
  const adminLoginRes = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@iwfindia.org",
      password: "Islah@Admin2026!",
    }),
  });
  const adminLogin = (await adminLoginRes.json()) as any;
  assert(adminLogin.success, `Admin login failed: ${adminLogin.message}`);
  const adminToken = adminLogin.token;
  console.log("✅ Super Admin logged in successfully.");

  // 3. Finance Approver submits an access request for a restricted permission
  const testPermission = "system.audit:view";
  console.log(`\n3. Submitting access request for "${testPermission}" as Finance Approver...`);
  const reqRes = await fetch(`${BASE_URL}/admin/access-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${approverToken}`,
    },
    body: JSON.stringify({
      requestedResource: "/staff/logs",
      requestedPermission: testPermission,
      moduleName: "Activity Logs",
      reason: "Need read-only access to audit staff financial logs for quarterly review",
      accessType: "read_only",
    }),
  });
  const reqData = (await reqRes.json()) as any;
  // It could be 201 or 409 if already existing
  let requestId = reqData.data?._id;
  if (reqRes.status === 409) {
    console.log("ℹ️ Pending request already existed. Using existing ID:", requestId);
  } else {
    assert(reqData.success, `Submit request failed: ${reqData.message}`);
    console.log("✅ Access request created successfully. Request ID:", requestId);
  }

  // 4. List access requests as Super Admin
  console.log("\n4. Super Admin listing access requests...");
  const listRes = await fetch(`${BASE_URL}/admin/access-requests?status=pending`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const listData = (await listRes.json()) as any;
  assert(listData.success, "Super Admin failed to list requests");
  console.log(`✅ Pending requests retrieved. Count: ${listData.data.length}, Pending count: ${listData.pendingCount}`);
  assert(listData.data.some((r: any) => r._id === requestId), "Created request not in pending list");

  // 5. Super Admin approves the access request
  console.log(`\n5. Super Admin approving request ${requestId}...`);
  const approveRes = await fetch(`${BASE_URL}/admin/access-requests/${requestId}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      reviewNote: "Approved for quarterly audit inspection",
    }),
  });
  const approveData = (await approveRes.json()) as any;
  assert(approveData.success, `Approve failed: ${approveData.message}`);
  console.log("✅ Super Admin approved access request successfully:", approveData.message);

  // 6. Check Finance Approver's live permissions via /auth/admin/me WITHOUT re-login
  console.log("\n6. Checking Finance Approver's live permissions via /auth/admin/me...");
  const meRes = await fetch(`${BASE_URL}/auth/admin/me`, {
    headers: { Authorization: `Bearer ${approverToken}` },
  });
  const meData = (await meRes.json()) as any;
  assert(meData.success, "Failed to get /me for Finance Approver");
  const perms = meData.admin.permissions;
  assert(
    perms.includes(testPermission),
    `Permission ${testPermission} was NOT dynamically granted in /me! Live perms: ${perms.join(", ")}`
  );
  console.log(`✅ Verified! Finance Approver dynamically holds permission "${testPermission}" in live session without logging in again!`);

  // 7. Verify Audit Log was recorded
  console.log("\n7. Verifying audit trail recorded the elevation...");
  const auditRes = await fetch(`${BASE_URL}/admin/audit-logs?limit=5`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const auditData = (await auditRes.json()) as any;
  assert(auditData.success, "Failed to load audit logs");
  const approveLog = auditData.data.find(
    (l: any) => l.action === "access_request.approve" && l.resourceId === requestId
  );
  assert(approveLog, "Audit log for access_request.approve was not found");
  console.log("✅ Verified! Audit log successfully captured access elevation:", approveLog.reason);

  // 8. Test Rejection flow for another permission
  console.log("\n8. Submitting access request for 'system.staff:delete' to test rejection...");
  const rejReqRes = await fetch(`${BASE_URL}/admin/access-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${approverToken}`,
    },
    body: JSON.stringify({
      requestedResource: "/staff/accounts",
      requestedPermission: "system.staff:delete",
      moduleName: "User Accounts",
      reason: "Need to clean up old accounts",
      accessType: "full",
    }),
  });
  const rejReqData = (await rejReqRes.json()) as any;
  const rejId = rejReqData.data?._id;
  assert(rejReqData.success, `Submit request failed: ${rejReqData.message}`);

  console.log(`Declining request ${rejId} as Super Admin...`);
  const declineRes = await fetch(`${BASE_URL}/admin/access-requests/${rejId}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      reviewNote: "Staff deletion is restricted strictly to HR and Super Admins",
    }),
  });
  const declineData = (await declineRes.json()) as any;
  assert(declineData.success, `Decline failed: ${declineData.message}`);
  assert(declineData.data.status === "rejected", "Status should be rejected");
  console.log("✅ Verified! Access request declined cleanly:", declineData.data.reviewNote);

  console.log("\n🎉 ALL ACCESS REQUEST & APPROVAL TESTS PASSED CLEANLY!");
}

run().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
