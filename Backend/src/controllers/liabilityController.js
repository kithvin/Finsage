const Liability = require('../models/liabilityModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * @description Create a new liability record in the database
 * @route POST /api/v1/liabilities
 * @access Public
 * @param {import('express').Request} req - Express request object containing liability details in body
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.createLiability = catchAsync(async (req, res, next) => {
  const newLiability = await Liability.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      liability: newLiability
    }
  });
});

/**
 * @description Retrieve all liability records from the database
 * @route GET /api/v1/liabilities
 * @access Public
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.getAllLiabilities = catchAsync(async (req, res, next) => {
  const liabilities = await Liability.find();

  res.status(200).json({
    status: 'success',
    results: liabilities.length,
    data: {
      liabilities
    }
  });
});

/**
 * @description Retrieve a specific liability record by its unique ID
 * @route GET /api/v1/liabilities/:id
 * @access Public
 * @param {import('express').Request} req - Express request object containing liability ID in params
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.getLiability = catchAsync(async (req, res, next) => {
  const liability = await Liability.findById(req.params.id);

  if (!liability) {
    return next(new AppError('No liability record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      liability
    }
  });
});

/**
 * @description Update an existing liability record by its unique ID
 * @route PATCH /api/v1/liabilities/:id
 * @access Public
 * @param {import('express').Request} req - Express request object containing liability ID in params and update data in body
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.updateLiability = catchAsync(async (req, res, next) => {
  const liability = await Liability.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!liability) {
    return next(new AppError('No liability record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      liability
    }
  });
});

/**
 * @description Permanently delete a liability record by its unique ID
 * @route DELETE /api/v1/liabilities/:id
 * @access Public
 * @param {import('express').Request} req - Express request object containing liability ID in params
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteLiability = catchAsync(async (req, res, next) => {
  const liability = await Liability.findByIdAndDelete(req.params.id);

  if (!liability) {
    return next(new AppError('No liability record found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
