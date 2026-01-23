import Income from "../models/incomeModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const createIncome = catchAsync(async (req, res) => {
  const newIncome = await Income.create(req.body);

  res.status(201).json({
    status: "success",
    data: { income: newIncome },
  });
});

export const getAllIncomes = catchAsync(async (req, res) => {
  const incomes = await Income.find();

  res.status(200).json({
    status: "success",
    results: incomes.length,
    data: { incomes },
  });
});

export const getIncome = catchAsync(async (req, res, next) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    return next(new AppError("No income record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { income },
  });
});

export const updateIncome = catchAsync(async (req, res, next) => {
  const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!income) {
    return next(new AppError("No income record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { income },
  });
});

export const deleteIncome = catchAsync(async (req, res, next) => {
  // Find and delete the income record by ID
  const income = await Income.findByIdAndDelete(req.params.id);

  // If no income record is found, return an error
  if (!income) {
    return next(new AppError("No income record found with that ID", 404));
  }

  // Respond with a 204 status code indicating successful deletion
  res.status(204).json({
    status: "success",
    data: null,
  });
});
