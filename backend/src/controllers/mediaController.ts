import { Request, Response } from "express";
import { Media, MediaCategory, MediaType } from "../models/Media.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinaryService.js";

export async function listMedia(req: Request, res: Response): Promise<void> {
  try {
    const { category, mediaType, tag, search } = req.query;
    const query: Record<string, any> = {};

    if (category && category !== "all") query.category = category;
    if (mediaType && mediaType !== "all") query.mediaType = mediaType;
    if (tag && tag !== "all") query.tags = tag;
    if (search) {
      query.$or = [
        { key: { $regex: search as string, $options: "i" } },
        { title: { $regex: search as string, $options: "i" } },
        { altText: { $regex: search as string, $options: "i" } },
        { tags: { $regex: search as string, $options: "i" } },
        { location: { $regex: search as string, $options: "i" } },
      ];
    }

    const items = await Media.find(query).sort({ category: 1, createdAt: -1 });

    // Also return a convenient key-to-URL map for the frontend to consume
    const keyMap: Record<string, string> = {};
    for (const item of items) {
      keyMap[item.key] = item.url;
    }

    res.json({
      success: true,
      count: items.length,
      data: items,
      keyMap,
    });
  } catch (error: any) {
    console.error("listMedia error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMediaByKey(req: Request, res: Response): Promise<void> {
  try {
    const rawKey = req.params.key;
    const key = Array.isArray(rawKey) ? rawKey[0] : rawKey;

    const item = await Media.findOne({ key });
    if (!item) {
      res.status(404).json({ success: false, message: `Media with key '${key}' not found` });
      return;
    }

    res.json({ success: true, data: item });
  } catch (error: any) {
    console.error("getMediaByKey error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function upsertMedia(req: Request, res: Response): Promise<void> {
  try {
    const {
      key,
      title,
      category,
      mediaType,
      altText,
      caption,
      videoUrl,
      thumbnailUrl,
      location,
      date,
      tags,
      url,
    } = req.body;
    const file = req.file;

    if (!key) {
      res.status(400).json({ success: false, message: "Media key is required (e.g. hero-slide-1)" });
      return;
    }

    let finalUrl = url;
    let publicId: string | undefined;
    let format: string | undefined;
    let bytes: number | undefined;

    // If a file was uploaded in the request, stream to Cloudinary
    if (file) {
      const folder = `islah/${category || "general"}`;
      const uploadResult = await uploadToCloudinary(file.buffer, folder, key);
      finalUrl = uploadResult.secureUrl;
      publicId = uploadResult.publicId;
      format = uploadResult.format;
      bytes = uploadResult.bytes;
    }

    if (!finalUrl && !videoUrl) {
      res.status(400).json({
        success: false,
        message: "Either upload a file, provide an image 'url', or provide a 'videoUrl'",
      });
      return;
    }

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const item = await Media.findOneAndUpdate(
      { key },
      {
        title: title || key,
        category: (category as MediaCategory) || "general",
        mediaType: (mediaType as MediaType) || "photo",
        url: finalUrl || videoUrl,
        videoUrl: videoUrl || undefined,
        thumbnailUrl: thumbnailUrl || undefined,
        publicId,
        format,
        bytes,
        altText,
        caption,
        location: location || undefined,
        date: date || undefined,
        tags: parsedTags,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: `Media '${key}' saved successfully in CMS`,
      data: item,
    });
  } catch (error: any) {
    console.error("upsertMedia error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to save media" });
  }
}

export async function deleteMedia(req: Request, res: Response): Promise<void> {
  try {
    const rawKey = req.params.key;
    const key = Array.isArray(rawKey) ? rawKey[0] : rawKey;

    const item = await Media.findOne({ key });
    if (!item) {
      res.status(404).json({ success: false, message: "Media item not found" });
      return;
    }

    // Delete from Cloudinary if publicId exists
    if (item.publicId) {
      try {
        await deleteFromCloudinary(item.publicId);
      } catch (cloudErr) {
        console.warn("Could not delete asset from Cloudinary:", cloudErr);
      }
    }

    await Media.deleteOne({ _id: item._id });

    res.json({
      success: true,
      message: `Media item '${key}' deleted from CMS`,
    });
  } catch (error: any) {
    console.error("deleteMedia error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
