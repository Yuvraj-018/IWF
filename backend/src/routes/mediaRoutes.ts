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
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const mediaRouter = Router();

mediaRouter.get("/", cacheResponse(180, "media"), listMedia);
mediaRouter.get("/albums", cacheResponse(180, "media"), listAlbums);
mediaRouter.get("/:key", cacheResponse(300, "media"), getMediaByKey);
mediaRouter.post("/", requireAdminAuth, uploadMiddleware.single("file"), upsertMedia);
mediaRouter.delete("/albums/:albumId", requireAdminAuth, deleteAlbum);
mediaRouter.delete("/:key", requireAdminAuth, deleteMedia);
