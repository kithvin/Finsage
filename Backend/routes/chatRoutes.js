import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.post("/message", chatController.processMessage);

export default router;
