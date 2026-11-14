import { Router } from "express";
import {
  listCareerOpenings,
  getCareerOpeningById,
  createCareerOpening,
  updateCareerOpening,
  deleteCareerOpening,
} from "../controllers/careerController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const careerRouter = Router();

// Public Career Directory (Preserved Exactly)
careerRouter.get("/", cacheResponse(180, "careers"), listCareerOpenings);
careerRouter.get("/:id", cacheResponse(300, "careers"), getCareerOpeningById);

// Protected Admin Operations
careerRouter.post("/", authenticate, requirePermission("cms.career:create"), createCareerOpening);
careerRouter.put("/:id", authenticate, requirePermission("cms.career:edit"), updateCareerOpening);
careerRouter.delete("/:id", authenticate, requirePermission("cms.career:delete"), deleteCareerOpening);
