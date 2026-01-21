import express from "express";
import assetController from "../controllers/assetController.js";

const router = express.Router();

router
  .route("/")
  .get(assetController.getAllAssets)
  .post(assetController.createAsset);

router
  .route("/:id")
  .get(assetController.getAsset)
  .patch(assetController.updateAsset)
  .delete(assetController.deleteAsset);

export default router;
