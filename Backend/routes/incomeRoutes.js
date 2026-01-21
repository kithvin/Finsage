import express from "express";
import {
  createIncome,
  getAllIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router.route("/")
  .get(getAllIncomes)
  .post(createIncome);

router.route("/:id")
  .get(getIncome)
  .patch(updateIncome)
  .delete(deleteIncome);

export default router;
