const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

/**
 * Health Routes
 * Defines routes for checking the server status.
 * Base Path: /api/v1/health
 */
router.get('/', healthController.getHealth);

module.exports = router;
