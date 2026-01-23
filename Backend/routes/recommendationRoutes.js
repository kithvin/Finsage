import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

// Route to handle fetching recommendations
router.get("/", getRecommendations);

export default router;
