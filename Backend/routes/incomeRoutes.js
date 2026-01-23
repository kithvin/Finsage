import express from "express";
import {
  createIncome,
  getAllIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

// Route to get all incomes or create a new income
router.route("/")
  .get(getAllIncomes) // GET request to fetch all incomes
  .post(createIncome); // POST request to create a new income

// Route to get, update, or delete a specific income by ID
router.route("/:id")
  .get(getIncome) // GET request to fetch a specific income by ID
  .patch(updateIncome) // PATCH request to update a specific income by ID
  .delete(deleteIncome); // DELETE request to remove a specific income by ID

export default router;
