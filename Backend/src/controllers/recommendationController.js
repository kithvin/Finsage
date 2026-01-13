const Income = require('../models/incomeModel');
const Asset = require('../models/assetModel');
const Liability = require('../models/liabilityModel');
const Card = require('../models/cardModel');
const geminiService = require('../services/geminiService');
const catchAsync = require('../utils/catchAsync');

/**
 * @function getRecommendations
 * @description Controller to fetch financial data and generate AI recommendations.
 * This function performs the following steps:
 * 1. Retrieves all financial records (Income, Asset, Liability, Card) from the database in parallel.
 * 2. Aggregates and formats this data into a concise summary object.
 * 3. Calls the GeminiService to generate financial advice based on the summary.
 * 4. Sends the generated recommendations back to the client in a JSON response.
 *
 * @route GET /api/v1/recommendations
 * @access Public
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the recommendations.
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
