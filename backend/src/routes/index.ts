import mongoose from "mongoose";
import { Router } from "express";
import { donationRouter } from "./donationRoutes.js";
import { memberRouter } from "./memberRoutes.js";
import { patientRouter } from "./patientRoutes.js";
import { applicationRouter } from "./applicationRoutes.js";
import { verificationRouter } from "./verificationRoutes.js";
import { contactRouter } from "./contactRoutes.js";
import { uploadRouter } from "./uploadRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
import { mediaRouter } from "./mediaRoutes.js";
import { newsRouter } from "./newsRoutes.js";
import { authRouter } from "./authRoutes.js";
import { settingsRouter } from "./settingsRoutes.js";
import { careerRouter } from "./careerRoutes.js";
import { publicationRouter } from "./publicationRoutes.js";
import { storyRouter } from "./storyRoutes.js";
import { financeRouter } from "./financeRoutes.js";
import { staffRouter } from "./staffRoutes.js";
import { roleRouter } from "./roleRoutes.js";
import { auditRouter } from "./auditRoutes.js";
import {
  createOrderController,
  verifyPaymentController,
  handleWebhookController,
} from "../controllers/paymentController.js";
import { getPublicFinancialSummary } from "../controllers/transparencyController.js";
import { orderRateLimiter, apiGlobalLimiter } from "../middlewares/rateLimiter.js";

export const apiRouter = Router();

// Apply global rate limiter across API
apiRouter.use(apiGlobalLimiter);

apiRouter.get("/health", (_req, res) => {
  const dbStateMap: Record<number, string> = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const dbStatus = dbStateMap[mongoose.connection.readyState] || "unknown";
  const isHealthy = mongoose.connection.readyState === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "degraded",
    service: "ISLAH Backend API",
    database: dbStatus,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Primary Resources
apiRouter.use("/donations", donationRouter);
apiRouter.use("/members", memberRouter);
apiRouter.use("/patients", patientRouter);
apiRouter.use("/applications", applicationRouter);
apiRouter.use("/verify", verificationRouter);
apiRouter.use("/contact", contactRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/media", mediaRouter);
apiRouter.use("/news", newsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/careers", careerRouter);
apiRouter.use("/publications", publicationRouter);
apiRouter.use("/stories", storyRouter);
apiRouter.use("/finance", financeRouter);

// Staff, Role & Governance Administration APIs
apiRouter.use("/admin/staff", staffRouter);
apiRouter.use("/admin/roles", roleRouter);
apiRouter.use("/admin/audit-logs", auditRouter);

// Razorpay Direct Route Aliases (Preserved Exactly)
apiRouter.post("/create-order", orderRateLimiter, createOrderController);
apiRouter.post("/verify-payment", verifyPaymentController);
apiRouter.post("/webhook/razorpay", handleWebhookController);

// Public Financial Transparency Summary (No Auth, Zero PII, Preserved Exactly)
apiRouter.get("/public/transparency/financial-summary", getPublicFinancialSummary);
