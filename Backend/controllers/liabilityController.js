// Importing the Liability model to interact with the liabilities collection in the database
import Liability from "../models/liabilityModel.js";
// Importing a utility function to handle asynchronous errors
import catchAsync from "../utils/catchAsync.js";
// Importing a custom error handling class
import AppError from "../utils/AppError.js";

// Controller to create a new liability record
const createLiability = catchAsync(async (req, res) => {
  const newLiability = await Liability.create(req.body);

  res.status(201).json({
    status: "success",
    data: { liability: newLiability },
  });
});

// Controller to fetch all liability records
const getAllLiabilities = catchAsync(async (req, res) => {
  const liabilities = await Liability.find();

  res.status(200).json({
    status: "success",
    results: liabilities.length,
    data: { liabilities },
  });
});

// Controller to fetch a single liability record by ID
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

// Controller to update a liability record by ID
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

// Controller to delete a liability record by ID
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

// Exporting all liability controllers as a default object
export default {
  createLiability,
  getAllLiabilities,
  getLiability,
  updateLiability,
  deleteLiability,
};
