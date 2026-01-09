const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

/**
 * @route GET /api/v1/health
 * @description Check the operational status of the server
 * @access Public
 */
router.get('/', healthController.getHealth);

module.exports = router;
