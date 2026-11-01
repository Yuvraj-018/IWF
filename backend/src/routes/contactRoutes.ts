import { Router } from "express";
import { submitContact } from "../controllers/contactController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { honeypotCheck } from "../middlewares/honeypot.js";

export const contactRouter = Router();

contactRouter.post("/", formSubmissionLimiter, honeypotCheck, submitContact);
