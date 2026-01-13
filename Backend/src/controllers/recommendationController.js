const Income = require('../models/incomeModel');
const Asset = require('../models/assetModel');
const Liability = require('../models/liabilityModel');
const Card = require('../models/cardModel');
const geminiService = require('../services/geminiService');
const catchAsync = require('../utils/catchAsync');

/**
 * @description Generate financial recommendations using Gemini AI based on all database records
 * @route GET /api/v1/recommendations
 * @access Public
 */
exports.getRecommendations = catchAsync(async (req, res, next) => {
  // 1. Fetch all data from the database
  const [incomes, assets, liabilities, cards] = await Promise.all([
    Income.find(),
    Asset.find(),
    Liability.find(),
    Card.find()
  ]);

  // 2. Prepare data summary for the AI
  // We map to essential fields to reduce token usage and noise
  const financialSummary = {
    incomes: incomes.map(i => ({ source: i.incomeSource, amount: i.amount, frequency: i.frequency })),
    assets: assets.map(a => ({ name: a.assetName, type: a.assetType, value: a.currentValue })),
    liabilities: liabilities.map(l => ({ source: l.liabilitySource, amount: l.amount, status: l.status })),
    cards: cards.map(c => ({ name: c.cardName, limit: c.creditLimit, used: c.amountUsed, type: c.cardType }))
  };

  // 3. Get recommendations from Gemini Service
  const recommendations = await geminiService.generateAdvice(financialSummary);

  // 4. Send response
  res.status(200).json({
    status: 'success',
    data: {
      recommendations
    }
  });
});
