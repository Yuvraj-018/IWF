import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteFile,
  getPrivateFile,
} from "../controllers/uploadController.js";
import { formSubmissionLimiter } from "../middlewares/rateLimiter.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const uploadRouter = Router();

// Single file upload (field: "file") - Used by Public Career & Application Wizard for resumes/documents
uploadRouter.post("/single", formSubmissionLimiter, uploadMiddleware.single("file"), uploadSingleFile);

// Multiple files upload (field: "files", max 10 files) - Restricted to authenticated CMS admins
uploadRouter.post(
  "/multiple",
  authenticate,
  requirePermission("cms.media:create"),
  uploadMiddleware.array("files", 10),
  uploadMultipleFiles
);

// View/Download confidential document from islah-private-docs via expiring signed URL (Admin authenticated)
uploadRouter.get(
  "/private",
  authenticate,
  requirePermission("membership.application:view_pii"),
  getPrivateFile
);
uploadRouter.get(
  "/private/*filePath",
  authenticate,
  requirePermission("membership.application:view_pii"),
  getPrivateFile
);

// Delete file by publicId / key - Restricted to authenticated CMS admins
uploadRouter.delete("/", authenticate, requirePermission("cms.media:delete"), deleteFile);
uploadRouter.delete("/:publicId", authenticate, requirePermission("cms.media:delete"), deleteFile);
