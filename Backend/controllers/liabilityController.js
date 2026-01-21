import Liability from "../models/liabilityModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const createLiability = catchAsync(async (req, res) => {
  const newLiability = await Liability.create(req.body);

  res.status(201).json({
    status: "success",
    data: { liability: newLiability },
  });
});

const getAllLiabilities = catchAsync(async (req, res) => {
  const liabilities = await Liability.find();

  res.status(200).json({
    status: "success",
    results: liabilities.length,
    data: { liabilities },
  });
});

const getLiability = catchAsync(async (req, res, next) => {
  const liability = await Liability.findById(req.params.id);

  if (!liability) {
    return next(new AppError("No liability record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { liability },
  });
});

const updateLiability = catchAsync(async (req, res, next) => {
  const liability = await Liability.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!liability) {
    return next(new AppError("No liability record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { liability },
  });
});

const deleteLiability = catchAsync(async (req, res, next) => {
  const liability = await Liability.findByIdAndDelete(req.params.id);

  if (!liability) {
    return next(new AppError("No liability record found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export default {
  createLiability,
  getAllLiabilities,
  getLiability,
  updateLiability,
  deleteLiability,
};
