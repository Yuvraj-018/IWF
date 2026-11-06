import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
  getPrivateFile,
} from "../controllers/uploadController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";

export const uploadRouter = Router();

// Single file upload (field: "file") - Used by Career & Application Wizard for resumes/documents
uploadRouter.post("/single", formSubmissionLimiter, uploadMiddleware.single("file"), uploadSingleFile);

// Multiple files upload (field: "files", max 10 files) - Restricted to authenticated CMS admins
uploadRouter.post("/multiple", requireAdminAuth, uploadMiddleware.array("files", 10), uploadMultipleFiles);

// View/Download confidential document from islah-private-docs via expiring signed URL (Admin authenticated)
uploadRouter.get("/private/*", requireAdminAuth, getPrivateFile);

// Delete file by publicId / key - Restricted to authenticated CMS admins
uploadRouter.delete("/", requireAdminAuth, deleteFile);
uploadRouter.delete("/:publicId", requireAdminAuth, deleteFile);

