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
import {
  createOrderController,
  verifyPaymentController,
  handleWebhookController,
} from "../controllers/paymentController.js";
import { orderRateLimiter, apiGlobalLimiter } from "../middlewares/rateLimiter.js";

export const apiRouter = Router();

// Apply global rate limiter across API
apiRouter.use(apiGlobalLimiter);

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "ISLAH Backend API",
    time: new Date().toISOString(),
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

// Razorpay Direct Route Aliases
apiRouter.post("/create-order", orderRateLimiter, createOrderController);
apiRouter.post("/verify-payment", verifyPaymentController);
apiRouter.post("/webhook/razorpay", handleWebhookController);
