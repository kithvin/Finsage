const express = require('express');
const assetController = require('../controllers/assetController');

const router = express.Router();

/**
 * @route /api/v1/assets
 * @description Handle operations on the asset collection
 */
router
  .route('/')
  /**
   * @route GET /api/v1/assets
   * @description Retrieve all asset records
   * @access Public
   */
  .get(assetController.getAllAssets)
  /**
   * @route POST /api/v1/assets
   * @description Create a new asset record
   * @access Public
   */
  .post(assetController.createAsset);

/**
 * @route /api/v1/assets/:id
 * @description Handle operations on a specific asset record by ID
 */
router
  .route('/:id')
  /**
   * @route GET /api/v1/assets/:id
   * @description Retrieve a specific asset record
   * @access Public
   */
  .get(assetController.getAsset)
  /**
   * @route PATCH /api/v1/assets/:id
   * @description Update a specific asset record
   * @access Public
   */
  .patch(assetController.updateAsset)
  /**
   * @route DELETE /api/v1/assets/:id
   * @description Delete a specific asset record
   * @access Public
   */
  .delete(assetController.deleteAsset);

module.exports = router;
