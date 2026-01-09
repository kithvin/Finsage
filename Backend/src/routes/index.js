const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');

/**
 * Main Router
 * Aggregates all module routes.
 */
router.use('/health', healthRoutes);

module.exports = router;
