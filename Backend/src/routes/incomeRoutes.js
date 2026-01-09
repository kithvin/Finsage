const express = require('express');
const incomeController = require('../controllers/incomeController');

const router = express.Router();

/**
 * @route /api/v1/incomes
 * @description Handle operations on the income collection
 */
router
  .route('/')
  /**
   * @route GET /api/v1/incomes
   * @description Retrieve all income records
   * @access Public
   */
  .get(incomeController.getAllIncomes)
  /**
   * @route POST /api/v1/incomes
   * @description Create a new income record
   * @access Public
   */
  .post(incomeController.createIncome);

/**
 * @route /api/v1/incomes/:id
 * @description Handle operations on a specific income record by ID
 */
router
  .route('/:id')
  /**
   * @route GET /api/v1/incomes/:id
   * @description Retrieve a specific income record
   * @access Public
   */
  .get(incomeController.getIncome)
  /**
   * @route PATCH /api/v1/incomes/:id
   * @description Update a specific income record
   * @access Public
   */
  .patch(incomeController.updateIncome)
  /**
   * @route DELETE /api/v1/incomes/:id
   * @description Delete a specific income record
   * @access Public
   */
  .delete(incomeController.deleteIncome);

module.exports = router;
