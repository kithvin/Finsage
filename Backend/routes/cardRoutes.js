// This file defines the routes for card-related operations.

import express from "express";
import cardController from "../controllers/cardController.js";

const router = express.Router();

// Route for getting all cards and creating a new card
router
  .route("/")
  .get(cardController.getAllCards) // Fetch all cards
  .post(cardController.createCard); // Create a new card

// Route for operations on a specific card by ID
router
  .route("/:id")
  .get(cardController.getCard) // Fetch a specific card by ID
  .patch(cardController.updateCard) // Update a specific card by ID
  .delete(cardController.deleteCard); // Delete a specific card by ID

export default router;
