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

  // FIXED: now exists in geminiService
  const recommendations = await geminiService.generateAdvice(financialSummary);

  res.status(200).json({
    status: "success",
    data: { recommendations },
  });
});
