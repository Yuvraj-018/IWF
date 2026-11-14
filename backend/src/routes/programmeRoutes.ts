import { Router } from "express";
import { authenticate, requirePermission } from "../middlewares/rbac.js";
import { createInitiative, listInitiatives } from "../controllers/programmeController.js";

export const programmeRouter = Router();

programmeRouter.use(authenticate);
programmeRouter.get("/initiatives", requirePermission("programme.initiative:view"), listInitiatives);
programmeRouter.post("/initiatives", requirePermission("programme.initiative:create"), createInitiative);
