import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload.js";
import {
  listMedia,
  listAlbums,
  getMediaByKey,
  upsertMedia,
  deleteMedia,
} from "../controllers/mediaController.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const mediaRouter = Router();

mediaRouter.get("/", listMedia);
mediaRouter.get("/albums", listAlbums);
mediaRouter.get("/:key", getMediaByKey);
mediaRouter.post("/", requireAdminAuth, uploadMiddleware.single("file"), upsertMedia);
mediaRouter.delete("/:key", requireAdminAuth, deleteMedia);
