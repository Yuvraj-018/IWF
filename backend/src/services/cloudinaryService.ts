import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../config/cloudinary.js";
import { Readable } from "stream";
import fs from "fs";
import path from "path";

export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  bytes: number;
  resourceType: string;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "islah/general",
  originalName?: string
): Promise<UploadResult> {
  const hasCloudinary = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

  // If Cloudinary keys are not set, automatically save to local uploads directory
  if (!hasCloudinary) {
    const uploadsDir = path.resolve(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = originalName ? path.extname(originalName) : ".jpg";
    const cleanBase = originalName
      ? path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_")
      : "asset";
    const filename = `${cleanBase}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, fileBuffer);

    const port = process.env.PORT || 5000;
    const baseUrl = process.env.API_BASE_URL || `http://localhost:${port}`;
    const fileUrl = `${baseUrl}/uploads/${filename}`;

    console.log(`[STORAGE] Saved locally to ${fileUrl} (Cloudinary not configured yet)`);

    return {
      url: fileUrl,
      secureUrl: fileUrl,
      publicId: `local_${filename}`,
      format: ext.replace(".", "") || "bin",
      bytes: fileBuffer.length,
      resourceType: "auto",
    };
  }

  // Cloudinary Upload Stream when credentials are present
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        use_filename: true,
        filename_override: originalName,
      },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed with empty result"));
        }
        resolve({
          url: result.url,
          secureUrl: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
          resourceType: result.resource_type,
        });
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
): Promise<{ result: string }> {
  if (publicId.startsWith("local_")) {
    const filename = publicId.replace("local_", "");
    const filePath = path.resolve(process.cwd(), "uploads", filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn("[STORAGE] Failed to delete local file:", err);
      }
    }
    return { result: "ok" };
  }

  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
