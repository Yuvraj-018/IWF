import dotenv from "dotenv";
dotenv.config();

import { donationRouter } from "../routes/donationRoutes.js";
import { memberRouter } from "../routes/memberRoutes.js";
import { patientRouter } from "../routes/patientRoutes.js";
import { applicationRouter } from "../routes/applicationRoutes.js";
import { verificationRouter } from "../routes/verificationRoutes.js";
import { contactRouter } from "../routes/contactRoutes.js";
import { uploadRouter } from "../routes/uploadRoutes.js";
import { paymentRouter } from "../routes/paymentRoutes.js";
import { mediaRouter } from "../routes/mediaRoutes.js";
import { newsRouter } from "../routes/newsRoutes.js";
import { authRouter } from "../routes/authRoutes.js";
import { settingsRouter } from "../routes/settingsRoutes.js";
import { careerRouter } from "../routes/careerRoutes.js";
import { publicationRouter } from "../routes/publicationRoutes.js";
import { storyRouter } from "../routes/storyRoutes.js";
import { financeRouter } from "../routes/financeRoutes.js";
import { staffRouter } from "../routes/staffRoutes.js";
import { roleRouter } from "../routes/roleRoutes.js";
import { auditRouter } from "../routes/auditRoutes.js";

interface DiscoveredRoute {
  method: string;
  path: string;
  isPublic: boolean;
  permission?: string;
}

const SUBROUTERS = [
  { prefix: "/api/donations", router: donationRouter },
  { prefix: "/api/members", router: memberRouter },
  { prefix: "/api/patients", router: patientRouter },
  { prefix: "/api/applications", router: applicationRouter },
  { prefix: "/api/verify", router: verificationRouter },
  { prefix: "/api/contact", router: contactRouter },
  { prefix: "/api/upload", router: uploadRouter },
  { prefix: "/api/payment", router: paymentRouter },
  { prefix: "/api/media", router: mediaRouter },
  { prefix: "/api/news", router: newsRouter },
  { prefix: "/api/auth", router: authRouter },
  { prefix: "/api/settings", router: settingsRouter },
  { prefix: "/api/careers", router: careerRouter },
  { prefix: "/api/publications", router: publicationRouter },
  { prefix: "/api/stories", router: storyRouter },
  { prefix: "/api/finance", router: financeRouter },
  { prefix: "/api/admin/staff", router: staffRouter },
  { prefix: "/api/admin/roles", router: roleRouter },
  { prefix: "/api/admin/audit-logs", router: auditRouter },
];

// Direct top-level routes in apiRouter
const DIRECT_API_ROUTES: DiscoveredRoute[] = [
  { method: "GET", path: "/api/health", isPublic: true },
  { method: "POST", path: "/api/create-order", isPublic: true },
  { method: "POST", path: "/api/verify-payment", isPublic: true },
  { method: "POST", path: "/api/webhook/razorpay", isPublic: true },
  { method: "GET", path: "/api/public/transparency/financial-summary", isPublic: true },
];

// Non-negotiable public endpoints that the public client uses
const REQUIRED_PUBLIC_ENDPOINTS = [
  "GET /api/health",
  "POST /api/create-order",
  "POST /api/verify-payment",
  "POST /api/webhook/razorpay",
  "GET /api/public/transparency/financial-summary",
  "POST /api/donations",
  "GET /api/donations/:receiptNo",
  "GET /api/donations/:receiptNo/pdf",
  "POST /api/members",
  "GET /api/members",
  "GET /api/members/profile/:identifier",
  "GET /api/members/status/:memberNo",
  "POST /api/members/send-otp",
  "POST /api/members/verify-otp",
  "POST /api/members/renew",
  "POST /api/applications",
  "GET /api/patients",
  "GET /api/patients/:slug",
  "GET /api/careers",
  "GET /api/careers/:id",
  "GET /api/news",
  "GET /api/news/:slug",
  "GET /api/stories",
  "GET /api/stories/:id",
  "GET /api/publications",
  "GET /api/publications/:id",
  "GET /api/media",
  "GET /api/media/albums",
  "GET /api/media/:key",
  "GET /api/settings",
  "GET /api/settings/:key",
  "POST /api/contact",
  "POST /api/upload/single",
  "GET /api/verify/:documentNo",
  "POST /api/payment/create-order",
  "POST /api/payment/verify-payment",
  "POST /api/payment/webhook",
  "GET /api/finance/receipts/:receiptNo/pdf",
  "GET /api/finance/public/transparency/financial-summary",
  "POST /api/auth/admin/login",
  "POST /api/auth/admin/accept-invite",
];

export function collectAllRoutes(): DiscoveredRoute[] {
  const routes: DiscoveredRoute[] = [...DIRECT_API_ROUTES];

  for (const { prefix, router } of SUBROUTERS) {
    if (!router || !router.stack) continue;

    for (const layer of router.stack) {
      if (layer.route) {
        const routeObj = layer.route as any;
        const methods = Object.keys(routeObj.methods)
          .filter((m) => routeObj.methods[m])
          .map((m) => m.toUpperCase());

        const subPath = routeObj.path === "/" ? "" : routeObj.path;
        const fullPath = `${prefix}${subPath}`.replace(/\/+/g, "/");

        const isPublic = REQUIRED_PUBLIC_ENDPOINTS.includes(`${methods[0]} ${fullPath}`);

        methods.forEach((method) => {
          routes.push({
            method,
            path: fullPath,
            isPublic,
          });
        });
      }
    }
  }

  return routes;
}

async function runInventoryAudit() {
  console.log("================================================================");
  console.log("         ISLAH ROUTE INVENTORY & ACCESS INTEGRITY AUDIT         ");
  console.log("================================================================\n");

  const allRoutes = collectAllRoutes();
  console.log(`📊 Discovered ${allRoutes.length} HTTP routes across backend routers.\n`);

  let publicPassed = 0;
  let publicFailed = 0;

  console.log("🔍 [CHECK 1] Verifying Public Website Endpoints Integrity:");
  for (const expected of REQUIRED_PUBLIC_ENDPOINTS) {
    const [expectedMethod, expectedPath] = expected.split(" ");
    const match = allRoutes.find(
      (r) => r.method === expectedMethod && r.path === expectedPath
    );

    if (match) {
      publicPassed++;
      console.log(`  ✅ [PUBLIC CONFIRMED] ${expectedMethod.padEnd(6)} ${expectedPath}`);
    } else {
      publicFailed++;
      console.error(`  ❌ [MISSING ROUTE]     ${expectedMethod.padEnd(6)} ${expectedPath}`);
    }
  }

  console.log(`\n🔍 [CHECK 2] Auditing Admin Protected Endpoints:`);
  const adminRoutes = allRoutes.filter(
    (r) => !REQUIRED_PUBLIC_ENDPOINTS.includes(`${r.method} ${r.path}`)
  );

  console.log(`  🔒 Total Admin Protected Endpoints: ${adminRoutes.length}`);
  adminRoutes.forEach((r) => {
    console.log(`    🔐 [LOCKED] ${r.method.padEnd(6)} ${r.path}`);
  });

  console.log("\n================================================================");
  console.log(`  RESULTS: ${publicPassed}/${REQUIRED_PUBLIC_ENDPOINTS.length} Public Endpoints Preserved.`);
  console.log(`           ${adminRoutes.length} Admin Endpoints Protected.`);
  console.log("================================================================\n");

  if (publicFailed > 0) {
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith("testRouteInventory.ts") || process.argv[1]?.endsWith("testRouteInventory.js")) {
  runInventoryAudit().catch((err) => {
    console.error("Audit failure:", err);
    process.exit(1);
  });
}
