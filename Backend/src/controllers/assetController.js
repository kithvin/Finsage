const Asset = require('../models/assetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * @description Create a new asset record in the database
 * @route POST /api/v1/assets
 * @access Public
 * @param {import('express').Request} req - Express request object containing asset details in body
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.createAsset = catchAsync(async (req, res, next) => {
  const newAsset = await Asset.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      asset: newAsset
    }
  });
});

/**
 * @description Retrieve all asset records from the database
 * @route GET /api/v1/assets
 * @access Public
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.getAllAssets = catchAsync(async (req, res, next) => {
  const assets = await Asset.find();

  res.status(200).json({
    status: 'success',
    results: assets.length,
    data: {
      assets
    }
  });
});

/**
 * @description Retrieve a specific asset record by its unique ID
 * @route GET /api/v1/assets/:id
 * @access Public
 * @param {import('express').Request} req - Express request object containing asset ID in params
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.getAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    return next(new AppError('No asset record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      asset
    }
  });
});

/**
 * @description Update an existing asset record by its unique ID
 * @route PATCH /api/v1/assets/:id
 * @access Public
 * @param {import('express').Request} req - Express request object containing asset ID in params and update data in body
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.updateAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!asset) {
    return next(new AppError('No asset record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      asset
    }
  });
});

/**
 * @description Permanently delete an asset record by its unique ID
 * @route DELETE /api/v1/assets/:id
 * @access Public
 * @param {import('express').Request} req - Express request object containing asset ID in params
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
exports.deleteAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndDelete(req.params.id);

  if (!asset) {
    return next(new AppError('No asset record found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
