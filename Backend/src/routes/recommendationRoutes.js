const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

/**
 * @route GET /api/v1/recommendations
 * @description Get AI-powered financial recommendations
 */
router.get('/', recommendationController.getRecommendations);

module.exports = router;
