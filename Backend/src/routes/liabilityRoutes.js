const express = require('express');
const liabilityController = require('../controllers/liabilityController');

const router = express.Router();

/**
 * @route /api/v1/liabilities
 * @description Handle operations on the liability collection
 */
router
  .route('/')
  /**
   * @route GET /api/v1/liabilities
   * @description Retrieve all liability records
   * @access Public
   */
  .get(liabilityController.getAllLiabilities)
  /**
   * @route POST /api/v1/liabilities
   * @description Create a new liability record
   * @access Public
   */
  .post(liabilityController.createLiability);

/**
 * @route /api/v1/liabilities/:id
 * @description Handle operations on a specific liability record by ID
 */
router
  .route('/:id')
  /**
   * @route GET /api/v1/liabilities/:id
   * @description Retrieve a specific liability record
   * @access Public
   */
  .get(liabilityController.getLiability)
  /**
   * @route PATCH /api/v1/liabilities/:id
   * @description Update a specific liability record
   * @access Public
   */
  .patch(liabilityController.updateLiability)
  /**
   * @route DELETE /api/v1/liabilities/:id
   * @description Delete a specific liability record
   * @access Public
   */
  .delete(liabilityController.deleteLiability);

module.exports = router;
