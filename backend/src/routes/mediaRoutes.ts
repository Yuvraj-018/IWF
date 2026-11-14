import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  listMedia,
  listAlbums,
  getMediaByKey,
  upsertMedia,
  deleteMedia,
  deleteAlbum,
} from "../controllers/mediaController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const mediaRouter = Router();

// Public Media & Albums (Preserved Exactly)
mediaRouter.get("/", cacheResponse(180, "media"), listMedia);
mediaRouter.get("/albums", cacheResponse(180, "media"), listAlbums);
mediaRouter.get("/:key", cacheResponse(300, "media"), getMediaByKey);

// Protected Admin Operations
mediaRouter.post(
  "/",
  authenticate,
  requirePermission("cms.media:create"),
  uploadMiddleware.single("file"),
  upsertMedia
);
mediaRouter.delete(
  "/albums/:albumId",
  authenticate,
  requirePermission("cms.media:delete"),
  deleteAlbum
);
mediaRouter.delete(
  "/:key",
  authenticate,
  requirePermission("cms.media:delete"),
  deleteMedia
);
