import { Router } from "express";
import {
  createOrderController,
  verifyPaymentController,
  handleWebhookController,
} from "../controllers/paymentController.js";
import { orderRateLimiter } from "../middlewares/rateLimiter.js";

export const paymentRouter = Router();

paymentRouter.post("/create-order", orderRateLimiter, createOrderController);
paymentRouter.post("/verify-payment", verifyPaymentController);
paymentRouter.post("/webhook", handleWebhookController);
