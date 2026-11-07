import { Request, Response } from "express";
import { CareerOpening } from "../models/CareerOpening.js";
import { invalidateCache } from "../middlewares/cache.js";

export async function listCareerOpenings(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 6); // 6 per lot
    const skip = (page - 1) * limit;

    const filter: any = {};
    const isAdmin = Boolean(req.headers.authorization);

    // If not admin, only show active listings whose lastDate has not passed
    if (!isAdmin && req.query.all !== "true") {
      const today = new Date().toISOString().slice(0, 10);
      filter.status = "Active";
      filter.lastDate = { $gte: today };
    } else if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.location && req.query.location !== "All") {
      filter.location = req.query.location;
    }
    if (req.query.department && req.query.department !== "All") {
      filter.department = req.query.department;
    }
    if (req.query.experienceBand && req.query.experienceBand !== "All") {
      filter.experienceBand = req.query.experienceBand;
    }
    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { department: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
      ];
    }

    const [openings, total] = await Promise.all([
      CareerOpening.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
      CareerOpening.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: openings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("listCareerOpenings error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getCareerOpeningById(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const opening = await CareerOpening.findOne({
      $or: [{ openingId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!opening) {
      res.status(404).json({ success: false, message: "Career opening not found" });
      return;
    }

    res.json({ success: true, data: opening });
  } catch (error) {
    console.error("getCareerOpeningById error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function createCareerOpening(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;
    if (!body.title || !body.department || !body.location || !body.lastDate) {
      res.status(400).json({ success: false, message: "Title, department, location and last date are required" });
      return;
    }

    const generatedSlug =
      body.openingId ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString().slice(-4);

    const newOpening = new CareerOpening({
      ...body,
      openingId: generatedSlug,
    });

    await newOpening.save();
    invalidateCache("careers");

    res.status(201).json({ success: true, message: "Career opening created successfully", data: newOpening });
  } catch (error: any) {
    console.error("createCareerOpening error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create opening" });
  }
}

export async function updateCareerOpening(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const updated = await CareerOpening.findOneAndUpdate(
      { $or: [{ openingId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: "Career opening not found" });
      return;
    }

    invalidateCache("careers");
    res.json({ success: true, message: "Career opening updated successfully", data: updated });
  } catch (error: any) {
    console.error("updateCareerOpening error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to update opening" });
  }
}

export async function deleteCareerOpening(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const deleted = await CareerOpening.findOneAndDelete({
      $or: [{ openingId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!deleted) {
      res.status(404).json({ success: false, message: "Career opening not found" });
      return;
    }

    invalidateCache("careers");
    res.json({ success: true, message: "Career opening deleted successfully" });
  } catch (error) {
    console.error("deleteCareerOpening error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
