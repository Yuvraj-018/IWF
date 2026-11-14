import { Router } from "express";
import {
  listPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const publicationRouter = Router();

// Public Publications & Dossiers (Preserved Exactly)
publicationRouter.get("/", cacheResponse(180, "publications"), listPublications);
publicationRouter.get("/:id", cacheResponse(300, "publications"), getPublicationById);

// Protected Admin Operations
publicationRouter.post("/", authenticate, requirePermission("cms.publication:create"), createPublication);
publicationRouter.put("/:id", authenticate, requirePermission("cms.publication:edit"), updatePublication);
publicationRouter.delete("/:id", authenticate, requirePermission("cms.publication:delete"), deletePublication);
