import Income from "../models/incomeModel.js";
import Asset from "../models/assetModel.js";
import Liability from "../models/liabilityModel.js";
import Card from "../models/cardModel.js";
import geminiService from "../services/geminiService.js";
import catchAsync from "../utils/catchAsync.js";

export const getRecommendations = catchAsync(async (req, res, next) => {
  const [incomes, assets, liabilities, cards] = await Promise.all([
    Income.find(),
    Asset.find(),
    Liability.find(),
    Card.find(),
  ]);

  // Create a summary of the user's financial data to be used for generating recommendations
  const financialSummary = {
    incomes: incomes.map((i) => ({
      source: i.incomeSource,
      amount: i.amount,
      frequency: i.frequency,
    })),
    assets: assets.map((a) => ({
      name: a.assetName,
      type: a.assetType,
      value: a.currentValue,
    })),
    liabilities: liabilities.map((l) => ({
      source: l.liabilitySource,
      amount: l.amount,
      status: l.status,
    })),
    cards: cards.map((c) => ({
      name: c.cardName,
      limit: c.creditLimit,
      used: c.amountUsed,
      type: c.cardType,
    })),
  };

  // Generate financial advice based on the summarized data
  const recommendations = await geminiService.generateAdvice(financialSummary);

  res.status(200).json({
    status: "success",
    data: { recommendations },
  });
});
