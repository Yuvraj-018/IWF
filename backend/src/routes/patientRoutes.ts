import { Router } from "express";
import {
  listPatients,
  getPatientBySlug,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const patientRouter = Router();

patientRouter.get("/", listPatients);
patientRouter.get("/:slug", getPatientBySlug);
patientRouter.post("/", requireAdminAuth, createPatient);
patientRouter.put("/:slug", requireAdminAuth, updatePatient);
patientRouter.delete("/:slug", requireAdminAuth, deletePatient);
