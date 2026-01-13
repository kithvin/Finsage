const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');
const userRoutes = require('./userRoutes');
const incomeRoutes = require('./incomeRoutes');
const assetRoutes = require('./assetRoutes');
const liabilityRoutes = require('./liabilityRoutes');
const cardRoutes = require('./cardRoutes');
const recommendationRoutes = require('./recommendationRoutes');

/**
 * @description Main Router - Aggregates all module-specific routes into a single router.
 * This file serves as the central hub for all API endpoints, delegating requests to
 * specialized route files for users, incomes, assets, liabilities, and cards.
 * @module routes/routes
 */

/**
 * @route /api/v1/health
 * @description Routes for server health monitoring
 */
router.use('/health', healthRoutes);

/**
 * @route /api/v1/users
 * @description Routes for user management (CRUD)
 */
router.use('/users', userRoutes);

/**
 * @route /api/v1/incomes
 * @description Routes for income tracking (CRUD)
 */
router.use('/incomes', incomeRoutes);

/**
 * @route /api/v1/assets
 * @description Routes for asset management (CRUD)
 */
router.use('/assets', assetRoutes);

/**
 * @route /api/v1/liabilities
 * @description Routes for liability tracking (CRUD)
 */
router.use('/liabilities', liabilityRoutes);

/**
 * @route /api/v1/cards
 * @description Routes for credit card management (CRUD)
 */
router.use('/cards', cardRoutes);

/**
 * @route /api/v1/recommendations
 * @description Routes for AI-powered financial recommendations
 */
router.use('/recommendations', recommendationRoutes);

module.exports = router;
