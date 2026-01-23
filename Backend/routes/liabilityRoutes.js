// Importing necessary modules and the liability controller
import express from "express";
import liabilityController from "../controllers/liabilityController.js";

const router = express.Router();

// Routes for handling liabilities
// Base route: "/"
// GET: Fetch all liabilities
// POST: Create a new liability
router
  .route("/")
  .get(liabilityController.getAllLiabilities)
  .post(liabilityController.createLiability);

// Route for handling a specific liability by ID
// Base route: "/:id"
// GET: Fetch a specific liability by ID
// PATCH: Update a specific liability by ID
// DELETE: Delete a specific liability by ID
router
  .route("/:id")
  .get(liabilityController.getLiability)
  .patch(liabilityController.updateLiability)
  .delete(liabilityController.deleteLiability);

export default router;
