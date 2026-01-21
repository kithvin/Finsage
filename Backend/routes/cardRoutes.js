// routes/cardRoutes.js
import express from "express";
import cardController from "../controllers/cardController.js";

const router = express.Router();

router
  .route("/")
  .get(cardController.getAllCards)
  .post(cardController.createCard);

router
  .route("/:id")
  .get(cardController.getCard)
  .patch(cardController.updateCard)
  .delete(cardController.deleteCard);

export default router;
