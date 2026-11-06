import { Router } from "express";
import {
  listStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/storyController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const storyRouter = Router();

storyRouter.get("/", cacheResponse(180, "stories"), listStories);
storyRouter.get("/:id", cacheResponse(300, "stories"), getStoryById);

storyRouter.post("/", requireAdminAuth, createStory);
storyRouter.put("/:id", requireAdminAuth, updateStory);
storyRouter.delete("/:id", requireAdminAuth, deleteStory);

