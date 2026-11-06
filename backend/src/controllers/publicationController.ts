import { Request, Response } from "express";
import { Publication } from "../models/Publication.js";
import { invalidateCache } from "../middlewares/cache.js";

export async function listPublications(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 9);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.type && req.query.type !== "All Publications" && req.query.type !== "All") {
      filter.type = req.query.type;
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
        { authors: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
      ];
    }

    const [publications, total] = await Promise.all([
      Publication.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
      Publication.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: publications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("listPublications error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getPublicationById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const publication = await Publication.findById(id);

    if (!publication) {
      res.status(404).json({ success: false, message: "Publication not found" });
      return;
    }

    res.json({ success: true, data: publication });
  } catch (error) {
    console.error("getPublicationById error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function createPublication(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;
    if (!body.title || !body.downloadUrl) {
      res.status(400).json({ success: false, message: "Title and download/document URL are required" });
      return;
    }

    const newPub = new Publication({
      title: body.title.trim(),
      type: body.type || "Research Papers",
      authors: body.authors || "Islah Welfare Foundation Research Team",
      date: body.date || new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      summary: body.summary || "",
      coverUrl: body.coverUrl || "",
      downloadUrl: body.downloadUrl,
      fileSize: body.fileSize || "PDF",
      pages: body.pages || "Document",
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    await newPub.save();
    invalidateCache("publications");

    res.status(201).json({ success: true, message: "Publication published successfully", data: newPub });
  } catch (error: any) {
    console.error("createPublication error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create publication" });
  }
}

export async function updatePublication(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updated = await Publication.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: "Publication not found" });
      return;
    }

    invalidateCache("publications");
    res.json({ success: true, message: "Publication updated successfully", data: updated });
  } catch (error: any) {
    console.error("updatePublication error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to update publication" });
  }
}

export async function deletePublication(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await Publication.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: "Publication not found" });
      return;
    }

    invalidateCache("publications");
    res.json({ success: true, message: "Publication deleted successfully" });
  } catch (error) {
    console.error("deletePublication error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

