import { Request, Response } from "express";
import { uploadToR2, getSignedPrivateUrl } from "../services/r2Service.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinaryService.js";

export async function uploadSingleFile(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, message: "No file provided in form-data field 'file'" });
      return;
    }

    const folder = (req.body.folder as string) || "islah/general";
    const isPrivate = req.body.isPrivate === "true" || req.body.isPrivate === true;

    // Prioritize Cloudflare R2 if configured
    if (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID && process.env.CLOUDFLARE_ACCOUNT_ID) {
      const r2Result = await uploadToR2(file.buffer, {
        folder,
        originalName: file.originalname,
        isPrivate,
        mimeType: file.mimetype,
      });

      res.status(201).json({
        success: true,
        message: "File uploaded successfully to Cloudflare R2",
        file: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          sizeBytes: file.size,
          url: r2Result.url,
          publicId: r2Result.key,
          bucket: r2Result.bucket,
          isPrivate: r2Result.isPrivate,
        },
      });
      return;
    }

    // Fallback to Cloudinary / Local
    const result = await uploadToCloudinary(file.buffer, folder, file.originalname);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully to Cloudinary",
      file: {
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        url: result.secureUrl,
        publicId: result.publicId,
        format: result.format,
        resourceType: result.resourceType,
      },
    });
  } catch (error: any) {
    console.error("uploadSingleFile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload file",
    });
  }
}

export async function uploadMultipleFiles(req: Request, res: Response): Promise<void> {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: "No files provided in form-data field 'files'" });
      return;
    }

    const folder = (req.body.folder as string) || "islah/general";
    const isPrivate = req.body.isPrivate === "true" || req.body.isPrivate === true;

    if (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID && process.env.CLOUDFLARE_ACCOUNT_ID) {
      const uploadPromises = files.map(async (file) => {
        const r2Result = await uploadToR2(file.buffer, {
          folder,
          originalName: file.originalname,
          isPrivate,
          mimeType: file.mimetype,
        });
        return {
          originalName: file.originalname,
          mimeType: file.mimetype,
          sizeBytes: file.size,
          url: r2Result.url,
          publicId: r2Result.key,
          bucket: r2Result.bucket,
          isPrivate: r2Result.isPrivate,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      res.status(201).json({
        success: true,
        message: `${uploadedFiles.length} files uploaded successfully to Cloudflare R2`,
        files: uploadedFiles,
      });
      return;
    }

    const uploadPromises = files.map(async (file) => {
      const result = await uploadToCloudinary(file.buffer, folder, file.originalname);
      return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        url: result.secureUrl,
        publicId: result.publicId,
        format: result.format,
        resourceType: result.resourceType,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully to Cloudinary`,
      files: uploadedFiles,
    });
  } catch (error: any) {
    console.error("uploadMultipleFiles error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload files",
    });
  }
}

export async function getPrivateFile(req: Request, res: Response): Promise<void> {
  try {
    let rawKey =
      (req.params as any).filePath ||
      (req.params as any).key ||
      req.params[0] ||
      (req.query.key as string);

    if (!rawKey) {
      res.status(400).json({ success: false, message: "Document key is required" });
      return;
    }

    // Clean any leading path or slash prefix
    rawKey = String(rawKey)
      .replace(/^\/?api\/upload\/private\//, "")
      .replace(/^\/+/, "");

    // Generate a temporary 15-minute signed URL directly from Cloudflare R2
    const signedUrl = getSignedPrivateUrl(rawKey, 900);
    res.redirect(signedUrl);
  } catch (error: any) {
    console.error("getPrivateFile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Could not retrieve confidential document",
    });
  }
}

export async function deleteFile(req: Request, res: Response): Promise<void> {
  try {
    const rawPublicId =
      (req.body && req.body.publicId) ||
      (req.query && req.query.publicId) ||
      req.params.publicId ||
      req.params[0];
    const publicId = Array.isArray(rawPublicId) ? rawPublicId.join("/") : (rawPublicId as string);
    const resourceType = (req.query.resourceType as "image" | "raw" | "video") || "image";

    if (!publicId) {
      res.status(400).json({ success: false, message: "Public ID is required in body, query or URL param" });
      return;
    }

    const result = await deleteFromCloudinary(publicId, resourceType);

    res.json({
      success: true,
      message: "File deleted successfully from Cloudinary",
      result,
    });
  } catch (error: any) {
    console.error("deleteFile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete file from Cloudinary",
    });
  }
}
