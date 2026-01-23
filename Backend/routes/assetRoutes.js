import express from "express"; // Importing the Express framework
import assetController from "../controllers/assetController.js"; // Importing the asset controller

const router = express.Router(); // Creating a new router instance

// Define routes for asset-related operations
router
  .route("/") // Route for getting all assets and creating a new asset
  .get(assetController.getAllAssets) // GET request to fetch all assets
  .post(assetController.createAsset); // POST request to create a new asset

router
  .route("/:id") // Route for operations on a specific asset by ID
  .get(assetController.getAsset) // GET request to fetch a specific asset by its ID
  .patch(assetController.updateAsset) // PATCH request to update a specific asset by its ID
  .delete(assetController.deleteAsset); // DELETE request to remove a specific asset by its ID

export default router; // Exporting the router for use in other parts of the application
