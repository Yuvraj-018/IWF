import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
} from "../controllers/uploadController.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const uploadRouter = Router();

// Single file upload (field: "file")
uploadRouter.post("/single", requireAdminAuth, uploadMiddleware.single("file"), uploadSingleFile);

// Multiple files upload (field: "files", max 10 files)
uploadRouter.post("/multiple", requireAdminAuth, uploadMiddleware.array("files", 10), uploadMultipleFiles);

// Delete file by Cloudinary publicId (supports query ?publicId=..., body { publicId }, or /:publicId)
uploadRouter.delete("/", requireAdminAuth, deleteFile);
uploadRouter.delete("/:publicId", requireAdminAuth, deleteFile);

