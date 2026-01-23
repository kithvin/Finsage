import express from "express";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

// Route to handle feedback submission
router.post("/", submitFeedback);

export default router;
