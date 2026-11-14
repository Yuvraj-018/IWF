import { Router } from "express";
import {
  listStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/storyController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const storyRouter = Router();

// Public Stories (Preserved Exactly)
storyRouter.get("/", cacheResponse(180, "stories"), listStories);
storyRouter.get("/:id", cacheResponse(300, "stories"), getStoryById);

// Protected Admin Operations
storyRouter.post("/", authenticate, requirePermission("cms.story:create"), createStory);
storyRouter.put("/:id", authenticate, requirePermission("cms.story:edit"), updateStory);
storyRouter.delete("/:id", authenticate, requirePermission("cms.story:delete"), deleteStory);
