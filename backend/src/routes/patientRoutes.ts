import { Router } from "express";
import {
  listPatients,
  getPatientBySlug,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const patientRouter = Router();

// Public Patient Directory & Case Views (Preserved Exactly)
patientRouter.get("/", cacheResponse(180, "patients"), listPatients);
patientRouter.get("/:slug", cacheResponse(300, "patients"), getPatientBySlug);

// Protected Admin Operations
patientRouter.post("/", authenticate, requirePermission("cms.patient:create"), createPatient);
patientRouter.put("/:slug", authenticate, requirePermission("cms.patient:edit"), updatePatient);
patientRouter.delete("/:slug", authenticate, requirePermission("cms.patient:delete"), deletePatient);
