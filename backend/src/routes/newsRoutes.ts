import { Router } from "express";
import {
  listNewsEvents,
  getNewsEventBySlug,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from "../controllers/newsController.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const newsRouter = Router();

newsRouter.get("/", listNewsEvents);
newsRouter.get("/:slug", getNewsEventBySlug);
newsRouter.post("/", requireAdminAuth, createNewsEvent);
newsRouter.put("/:id", requireAdminAuth, updateNewsEvent);
newsRouter.delete("/:id", requireAdminAuth, deleteNewsEvent);

