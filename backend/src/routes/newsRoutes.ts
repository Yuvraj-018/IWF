import { Router } from "express";
import {
  listNewsEvents,
  getNewsEventBySlug,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
} from "../controllers/newsController.js";

export const newsRouter = Router();

newsRouter.get("/", listNewsEvents);
newsRouter.get("/:slug", getNewsEventBySlug);
newsRouter.post("/", createNewsEvent);
newsRouter.put("/:id", updateNewsEvent);
newsRouter.delete("/:id", deleteNewsEvent);

