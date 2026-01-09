const Income = require('../models/incomeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * @description Create a new income record in the database
 * @route POST /api/v1/incomes
 * @access Public
 * @param {Object} req - Express request object containing income details in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createIncome = catchAsync(async (req, res, next) => {
  const newIncome = await Income.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      income: newIncome
    }
  });
});

/**
 * @description Retrieve all income records from the database
 * @route GET /api/v1/incomes
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAllIncomes = catchAsync(async (req, res, next) => {
  const incomes = await Income.find();

  res.status(200).json({
    status: 'success',
    results: incomes.length,
    data: {
      incomes
    }
  });
});

/**
 * @description Retrieve a specific income record by its unique ID
 * @route GET /api/v1/incomes/:id
 * @access Public
 * @param {Object} req - Express request object containing income ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getIncome = catchAsync(async (req, res, next) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    return next(new AppError('No income record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      income
    }
  });
});

/**
 * @description Update an existing income record by its unique ID
 * @route PATCH /api/v1/incomes/:id
 * @access Public
 * @param {Object} req - Express request object containing income ID in params and update data in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateIncome = catchAsync(async (req, res, next) => {
  const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!income) {
    return next(new AppError('No income record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      income
    }
  });
});

/**
 * @description Permanently delete an income record by its unique ID
 * @route DELETE /api/v1/incomes/:id
 * @access Public
 * @param {Object} req - Express request object containing income ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteIncome = catchAsync(async (req, res, next) => {
  const income = await Income.findByIdAndDelete(req.params.id);

  if (!income) {
    return next(new AppError('No income record found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
