import { Request, Response } from "express";
import { Media, MediaCategory, MediaType } from "../models/Media.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinaryService.js";
import { uploadToR2, deleteFromR2 } from "../services/r2Service.js";
import { invalidateCache } from "../middlewares/cache.js";

export async function listMedia(req: Request, res: Response): Promise<void> {
  try {
    const { category, mediaType, tag, search, albumId, isCover } = req.query;
    const query: Record<string, any> = {};

    if (category && category !== "all") query.category = category;
    if (mediaType && mediaType !== "all") query.mediaType = mediaType;
    if (tag && tag !== "all") query.tags = tag;
    if (albumId) query.albumId = albumId;
    if (isCover !== undefined) query.isCover = isCover === "true";

    if (search) {
      query.$or = [
        { key: { $regex: search as string, $options: "i" } },
        { title: { $regex: search as string, $options: "i" } },
        { altText: { $regex: search as string, $options: "i" } },
        { tags: { $regex: search as string, $options: "i" } },
        { location: { $regex: search as string, $options: "i" } },
        { albumTitle: { $regex: search as string, $options: "i" } },
      ];
    }

    const items = await Media.find(query).sort({ order: 1, createdAt: -1 });

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

/**
 * Returns Gallery Media grouped into distinct Albums / Event Sections.
 * Each Album has a title, cover image, media count, and all related photos/videos.
 */
export async function listAlbums(req: Request, res: Response): Promise<void> {
  try {
    // Fetch all gallery items sorted
    const allGalleryItems = await Media.find({ category: "gallery" }).sort({ order: 1, createdAt: -1 });

    const albumMap = new Map<string, {
      albumId: string;
      albumTitle: string;
      coverUrl: string;
      mediaType: "photo" | "video";
      videoUrl?: string;
      date?: string;
      location?: string;
      count: number;
      items: any[];
    }>();

    for (const item of allGalleryItems) {
      const albumKey = item.albumId || item.key;
      const title = item.albumTitle || item.title || "Gallery Event";

      if (!albumMap.has(albumKey)) {
        albumMap.set(albumKey, {
          albumId: albumKey,
          albumTitle: title,
          coverUrl: item.thumbnailUrl || item.url,
          mediaType: item.mediaType as any,
          videoUrl: item.videoUrl,
          date: item.date,
          location: item.location,
          count: 0,
          items: [],
        });
      }

      const album = albumMap.get(albumKey)!;
      album.count += 1;
      album.items.push(item);

      // If this specific item is marked as cover, use its image as cover
      if (item.isCover) {
        album.coverUrl = item.thumbnailUrl || item.url;
      }
    }

    const albums = Array.from(albumMap.values());

    res.json({
      success: true,
      count: albums.length,
      data: albums,
    });
  } catch (error: any) {
    console.error("listAlbums error:", error);
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
      key: incomingKey,
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
      albumId,
      albumTitle,
      isCover,
      order,
      subHeading,
      ctaLink,
    } = req.body;
    const file = req.file;

    // Auto-generate key if not explicitly provided
    let key = incomingKey;
    if (!key || typeof key !== "string" || !key.trim()) {
      const cat = category || "general";
      const timestamp = Date.now();
      if (cat === "hero") {
        key = `hero-slide-${timestamp}`;
      } else if (cat === "gallery") {
        const cleanAlbum = (albumId || "event").toLowerCase().replace(/[^a-z0-9]/g, "-");
        key = `gallery-${cleanAlbum}-${timestamp.toString().slice(-6)}`;
      } else {
        key = `media-${cat}-${timestamp}`;
      }
    } else {
      key = key.trim();
    }

    let finalUrl = url;
    let publicId: string | undefined;
    let format: string | undefined;
    let bytes: number | undefined;

    // If a file was uploaded in the request, stream to Cloudflare R2 (or fallback to Cloudinary)
    if (file) {
      const folder = `islah/${category || "general"}`;
      if (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID && process.env.CLOUDFLARE_ACCOUNT_ID) {
        const r2Result = await uploadToR2(file.buffer, {
          folder,
          originalName: file.originalname || `${key}.jpg`,
          isPrivate: false,
          mimeType: file.mimetype,
        });
        finalUrl = r2Result.url;
        publicId = r2Result.key;
        bytes = r2Result.sizeBytes;
      } else {
        const uploadResult = await uploadToCloudinary(file.buffer, folder, key);
        finalUrl = uploadResult.secureUrl;
        publicId = uploadResult.publicId;
        format = uploadResult.format;
        bytes = uploadResult.bytes;
      }
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
        albumId: albumId || undefined,
        albumTitle: albumTitle || undefined,
        isCover: isCover === true || isCover === "true",
        order: Number(order) || 0,
        subHeading: subHeading || undefined,
        ctaLink: ctaLink || undefined,
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    invalidateCache("media");
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

export async function deleteAlbum(req: Request, res: Response): Promise<void> {
  try {
    const rawAlbumId = req.params.albumId;
    const albumId = Array.isArray(rawAlbumId) ? rawAlbumId[0] : rawAlbumId;

    if (!albumId) {
      res.status(400).json({ success: false, message: "albumId is required" });
      return;
    }

    const result = await Media.deleteMany({
      $or: [{ albumId }, { key: { $regex: new RegExp(`^gallery-${albumId}`, "i") } }],
    });

    invalidateCache("media");
    res.json({
      success: true,
      message: `Album '${albumId}' and all its photos (${result.deletedCount} items) deleted successfully`,
    });
  } catch (error: any) {
    console.error("deleteAlbum error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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

    // Delete from storage if publicId exists
    if (item.publicId) {
      try {
        if (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID && process.env.CLOUDFLARE_ACCOUNT_ID) {
          await deleteFromR2(item.publicId, false);
        } else {
          await deleteFromCloudinary(item.publicId);
        }
      } catch (storageErr) {
        console.warn("Could not delete asset from storage:", storageErr);
      }
    }

    await Media.deleteOne({ _id: item._id });

    invalidateCache("media");
    res.json({
      success: true,
      message: `Media item '${key}' deleted from CMS`,
    });
  } catch (error: any) {
    console.error("deleteMedia error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
