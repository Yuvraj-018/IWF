import { Router } from "express";
import { authenticate, requirePermission } from "../middlewares/rbac.js";
import { createBroadcast, listBroadcasts } from "../controllers/broadcastController.js";

export const broadcastRouter = Router();

broadcastRouter.use(authenticate);
broadcastRouter.get("/", requirePermission("comms.broadcast:view"), listBroadcasts);
broadcastRouter.post("/", requirePermission("comms.broadcast:create"), createBroadcast);
