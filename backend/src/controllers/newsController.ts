import { Request, Response } from "express";
import { NewsEvent } from "../models/NewsEvent.js";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listNewsEvents(req: Request, res: Response) {
  try {
    const { category, search, featured, isUpcoming, limit = 50, page = 1 } = req.query;

    const query: Record<string, any> = { published: true };

    if (category && category !== "All") {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    if (isUpcoming !== undefined) {
      query.isUpcoming = isUpcoming === "true";
    }

    if (search && typeof search === "string" && search.trim()) {
      const s = search.trim();
      query.$or = [
        { title: { $regex: s, $options: "i" } },
        { excerpt: { $regex: s, $options: "i" } },
        { category: { $regex: s, $options: "i" } },
        { location: { $regex: s, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total, allCategoryCounts, upcomingEvents] = await Promise.all([
      NewsEvent.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      NewsEvent.countDocuments(query),
      NewsEvent.aggregate([
        { $match: { published: true } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]),
      NewsEvent.find({ published: true, isUpcoming: true }).sort({ createdAt: -1 }).limit(4),
    ]);

    const categoryMap: Record<string, number> = { All: 0 };
    let totalAll = 0;
    allCategoryCounts.forEach((c) => {
      categoryMap[c._id] = c.count;
      totalAll += c.count;
    });
    categoryMap["All"] = totalAll;

    res.json({
      success: true,
      count: items.length,
      total,
      data: items,
      categories: [
        "All",
        "News & Updates",
        "Events",
        "Press Releases",
        "Community Activities",
        "Programs",
        "Campaigns",
      ],
      categoryCounts: Object.entries(categoryMap).map(([name, count]) => ({ name, count })),
      upcomingEvents,
    });
  } catch (err: any) {
    console.error("listNewsEvents error:", err);
    res.status(500).json({ success: false, message: "Error fetching news & events", error: err.message });
  }
}

export async function getNewsEventBySlug(req: Request, res: Response) {
  try {
    const slugStr = String(req.params.slug || "");
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(slugStr);

    const item = await NewsEvent.findOne({
      $or: [{ slug: slugStr }, ...(isMongoId ? [{ _id: slugStr }] : [])],
    });

    if (!item) {
      return res.status(404).json({ success: false, message: "News/Event not found" });
    }

    res.json({ success: true, data: item });
  } catch (err: any) {
    console.error("getNewsEventBySlug error:", err);
    res.status(500).json({ success: false, message: "Error fetching news item", error: err.message });
  }
}

export async function createNewsEvent(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.title || !body.excerpt) {
      return res.status(400).json({ success: false, message: "Title and excerpt are required" });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.title);

    const existing = await NewsEvent.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const created = await NewsEvent.create({
      ...body,
      slug: finalSlug,
      day: body.day || (body.date ? body.date.split(" ")[0] : "01"),
      month: body.month || (body.date ? body.date.split(" ").slice(1).join(" ") : ""),
    });

    res.status(201).json({ success: true, message: "News event created successfully", data: created });
  } catch (err: any) {
    console.error("createNewsEvent error:", err);
    res.status(500).json({ success: false, message: "Error creating news event", error: err.message });
  }
}

export async function updateNewsEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await NewsEvent.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "News event not found" });
    }

    res.json({ success: true, message: "News event updated successfully", data: updated });
  } catch (err: any) {
    console.error("updateNewsEvent error:", err);
    res.status(500).json({ success: false, message: "Error updating news event", error: err.message });
  }
}

export async function deleteNewsEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await NewsEvent.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "News event not found" });
    }

    res.json({ success: true, message: "News event deleted successfully" });
  } catch (err: any) {
    console.error("deleteNewsEvent error:", err);
    res.status(500).json({ success: false, message: "Error deleting news event", error: err.message });
  }
}
