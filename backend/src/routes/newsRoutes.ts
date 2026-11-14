import { Router } from "express";
import {
  listNewsEvents,
  getNewsEventBySlug,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from "../controllers/newsController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const newsRouter = Router();

// Public News & Events (Preserved Exactly)
newsRouter.get("/", cacheResponse(180, "news"), listNewsEvents);
newsRouter.get("/:slug", cacheResponse(300, "news"), getNewsEventBySlug);

// Protected Admin Operations
newsRouter.post("/", authenticate, requirePermission("cms.news:create"), createNewsEvent);
newsRouter.put("/:id", authenticate, requirePermission("cms.news:edit"), updateNewsEvent);
newsRouter.delete("/:id", authenticate, requirePermission("cms.news:delete"), deleteNewsEvent);
