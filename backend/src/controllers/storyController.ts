import { Request, Response } from "express";
import { SuccessStory } from "../models/SuccessStory.js";
import { invalidateCache } from "../middlewares/cache.js";

export async function listStories(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 9);
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.category && req.query.category !== "All Stories" && req.query.category !== "All") {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      const q = String(req.query.search).trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { personName: { $regex: q, $options: "i" } },
        { village: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
      ];
    }

    const [stories, total] = await Promise.all([
      SuccessStory.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit),
      SuccessStory.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: stories,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error("listStories error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getStoryById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const story = await SuccessStory.findById(id);

    if (!story) {
      res.status(404).json({ success: false, message: "Success story not found" });
      return;
    }

    res.json({ success: true, data: story });
  } catch (error) {
    console.error("getStoryById error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function createStory(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body;
    if (!body.title || !body.personName || !body.category || !body.excerpt || !body.fullStory) {
      res.status(400).json({
        success: false,
        message: "Title, person name, category, excerpt and full story are required",
      });
      return;
    }

    const newStory = new SuccessStory({
      title: body.title.trim(),
      category: body.category,
      personName: body.personName.trim(),
      village: body.village || "",
      state: body.state || "Bihar",
      excerpt: body.excerpt,
      fullStory: body.fullStory,
      image: body.image || "",
      videoUrl: body.videoUrl || "",
      impactMetrics: Array.isArray(body.impactMetrics)
        ? body.impactMetrics
        : typeof body.impactMetrics === "string"
        ? body.impactMetrics.split("\n").filter(Boolean)
        : [],
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    await newStory.save();
    invalidateCache("stories");

    res.status(201).json({ success: true, message: "Success story created successfully", data: newStory });
  } catch (error: any) {
    console.error("createStory error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create story" });
  }
}

export async function updateStory(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body;

    if (body.impactMetrics && typeof body.impactMetrics === "string") {
      body.impactMetrics = body.impactMetrics.split("\n").filter(Boolean);
    }

    const updated = await SuccessStory.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: "Success story not found" });
      return;
    }

    invalidateCache("stories");
    res.json({ success: true, message: "Success story updated successfully", data: updated });
  } catch (error: any) {
    console.error("updateStory error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to update story" });
  }
}

export async function deleteStory(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deleted = await SuccessStory.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: "Success story not found" });
      return;
    }

    invalidateCache("stories");
    res.json({ success: true, message: "Success story deleted successfully" });
  } catch (error) {
    console.error("deleteStory error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

