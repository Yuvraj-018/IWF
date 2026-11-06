import { Router } from "express";
import {
  listPatients,
  getPatientBySlug,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const patientRouter = Router();

patientRouter.get("/", cacheResponse(180, "patients"), listPatients);
patientRouter.get("/:slug", cacheResponse(300, "patients"), getPatientBySlug);
patientRouter.post("/", requireAdminAuth, createPatient);
patientRouter.put("/:slug", requireAdminAuth, updatePatient);
patientRouter.delete("/:slug", requireAdminAuth, deletePatient);
