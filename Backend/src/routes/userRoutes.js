const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @route /api/v1/users
 * @description Handle operations on the user collection
 */
router
  .route('/')
  /**
   * @route GET /api/v1/users
   * @description Retrieve all users
   * @access Public
   */
  .get(userController.getAllUsers)
  /**
   * @route POST /api/v1/users
   * @description Create a new user
   * @access Public
   */
  .post(userController.createUser);

/**
 * @route /api/v1/users/:id
 * @description Handle operations on a specific user by ID
 */
router
  .route('/:id')
  /**
   * @route GET /api/v1/users/:id
   * @description Retrieve a specific user
   * @access Public
   */
  .get(userController.getUser)
  /**
   * @route PATCH /api/v1/users/:id
   * @description Update a specific user
   * @access Public
   */
  .patch(userController.updateUser)
  /**
   * @route DELETE /api/v1/users/:id
   * @description Delete a specific user
   * @access Public
   */
  .delete(userController.deleteUser);

module.exports = router;
