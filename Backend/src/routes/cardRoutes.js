const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

/**
 * @route /api/v1/cards
 * @description Handle operations on the credit card collection
 */
router
  .route('/')
  /**
   * @route GET /api/v1/cards
   * @description Retrieve all credit card records
   * @access Public
   */
  .get(cardController.getAllCards)
  /**
   * @route POST /api/v1/cards
   * @description Create a new credit card record
   * @access Public
   */
  .post(cardController.createCard);

/**
 * @route /api/v1/cards/:id
 * @description Handle operations on a specific credit card record by ID
 */
router
  .route('/:id')
  /**
   * @route GET /api/v1/cards/:id
   * @description Retrieve a specific credit card record
   * @access Public
   */
  .get(cardController.getCard)
  /**
   * @route PATCH /api/v1/cards/:id
   * @description Update a specific credit card record
   * @access Public
   */
  .patch(cardController.updateCard)
  /**
   * @route DELETE /api/v1/cards/:id
   * @description Delete a specific credit card record
   * @access Public
   */
  .delete(cardController.deleteCard);

module.exports = router;
