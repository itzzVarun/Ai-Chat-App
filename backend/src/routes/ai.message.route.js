import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAiMessages,
  userMessage,
  aiMessage,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/ai-chat", protectRoute, getAiMessages);
router.post("/user-msg", protectRoute, userMessage);
router.post("/askai", protectRoute, aiMessage);

export default router;
