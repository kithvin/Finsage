// This file defines the routes for handling chat-related requests.

import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.post("/message", chatController.processMessage);

export default router;
