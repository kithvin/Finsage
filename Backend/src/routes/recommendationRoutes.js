const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

/**
 * @route GET /api/v1/recommendations
 * @description Endpoint to retrieve AI-generated financial recommendations.
 * This route delegates the request to the recommendationController.getRecommendations method.
 * @access Public
 */
router.get('/', recommendationController.getRecommendations);

module.exports = router;
