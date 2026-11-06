import { Request, Response } from "express";
import { Patient } from "../models/Patient.js";
import { invalidateCache } from "../middlewares/cache.js";

export async function listPatients(req: Request, res: Response): Promise<void> {
  try {
    const { urgent } = req.query;
    const query: Record<string, any> = { status: "Active" };
    if (urgent !== undefined) {
      query.urgent = urgent === "true";
    }

    const patients = await Patient.find(query).sort({ urgent: -1, createdAt: -1 });
    res.json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    console.error("listPatients error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getPatientBySlug(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const patient = await Patient.findOne({ slug });

    if (!patient) {
      res.status(404).json({ success: false, message: "Patient case not found" });
      return;
    }

    res.json({ success: true, patient });
  } catch (error) {
    console.error("getPatientBySlug error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function createPatient(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    if (!data.slug || !data.name || !data.neededAmount) {
      res.status(400).json({ success: false, message: "Missing required patient fields" });
      return;
    }

    const existing = await Patient.findOne({ slug: data.slug });
    if (existing) {
      res.status(400).json({ success: false, message: "A patient case with this slug already exists" });
      return;
    }

    const patientData = {
      ...data,
      admissionDate: data.admissionDate || new Date().toISOString().split("T")[0],
      verificationDate: data.verificationDate || new Date().toISOString().split("T")[0],
      costBreakdown: Array.isArray(data.costBreakdown) ? data.costBreakdown : [],
    };

    const patient = new Patient(patientData);
    await patient.save();

    invalidateCache("patients");
    res.status(201).json({ success: true, message: "Patient case created", patient });
  } catch (error) {
    console.error("createPatient error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updatePatient(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const updateData = req.body;

    const patient = await Patient.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!patient) {
      res.status(404).json({ success: false, message: "Patient case not found" });
      return;
    }

    invalidateCache("patients");
    res.json({ success: true, message: "Patient case updated", patient });
  } catch (error: any) {
    console.error("updatePatient error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to update patient" });
  }
}

export async function deletePatient(req: Request, res: Response): Promise<void> {
  try {
    const { slug } = req.params;
    const deleted = await Patient.findOneAndDelete({ slug });

    if (!deleted) {
      res.status(404).json({ success: false, message: "Patient case not found" });
      return;
    }

    invalidateCache("patients");
    res.json({ success: true, message: "Patient case deleted successfully" });
  } catch (error) {
    console.error("deletePatient error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
