import { Router } from "express";
import {
  listPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const publicationRouter = Router();

publicationRouter.get("/", cacheResponse(180, "publications"), listPublications);
publicationRouter.get("/:id", cacheResponse(300, "publications"), getPublicationById);

publicationRouter.post("/", requireAdminAuth, createPublication);
publicationRouter.put("/:id", requireAdminAuth, updatePublication);
publicationRouter.delete("/:id", requireAdminAuth, deletePublication);

