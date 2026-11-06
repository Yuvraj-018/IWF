import { Router } from "express";
import {
  listNewsEvents,
  getNewsEventBySlug,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from "../controllers/newsController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const newsRouter = Router();

newsRouter.get("/", cacheResponse(180, "news"), listNewsEvents);
newsRouter.get("/:slug", cacheResponse(300, "news"), getNewsEventBySlug);
newsRouter.post("/", requireAdminAuth, createNewsEvent);
newsRouter.put("/:id", requireAdminAuth, updateNewsEvent);
newsRouter.delete("/:id", requireAdminAuth, deleteNewsEvent);

