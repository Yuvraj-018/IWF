import { Router } from "express";
import {
  listCareerOpenings,
  getCareerOpeningById,
  createCareerOpening,
  updateCareerOpening,
  deleteCareerOpening,
} from "../controllers/careerController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const careerRouter = Router();

careerRouter.get("/", cacheResponse(180, "careers"), listCareerOpenings);
careerRouter.get("/:id", cacheResponse(300, "careers"), getCareerOpeningById);

careerRouter.post("/", requireAdminAuth, createCareerOpening);
careerRouter.put("/:id", requireAdminAuth, updateCareerOpening);
careerRouter.delete("/:id", requireAdminAuth, deleteCareerOpening);

