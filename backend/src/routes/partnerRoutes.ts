import { Router } from "express";
import { authenticate, requirePermission } from "../middlewares/rbac.js";
import { createPartnerAgreement, listPartnerAgreements } from "../controllers/partnerController.js";

export const partnerRouter = Router();

partnerRouter.use(authenticate);
partnerRouter.get("/", requirePermission("membership.application:view"), listPartnerAgreements);
partnerRouter.post("/", requirePermission("membership.application:view"), createPartnerAgreement);
