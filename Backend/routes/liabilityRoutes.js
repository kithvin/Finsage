import express from "express";
import liabilityController from "../controllers/liabilityController.js";

const router = express.Router();

router
  .route("/")
  .get(liabilityController.getAllLiabilities)
  .post(liabilityController.createLiability);

router
  .route("/:id")
  .get(liabilityController.getLiability)
  .patch(liabilityController.updateLiability)
  .delete(liabilityController.deleteLiability);

export default router;
