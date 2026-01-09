const Card = require('../models/cardModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * @description Create a new credit card record in the database
 * @route POST /api/v1/cards
 * @access Public
 * @param {Object} req - Express request object containing card details in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createCard = catchAsync(async (req, res, next) => {
  const newCard = await Card.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      card: newCard
    }
  });
});

/**
 * @description Retrieve all credit card records from the database
 * @route GET /api/v1/cards
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAllCards = catchAsync(async (req, res, next) => {
  const cards = await Card.find();

  res.status(200).json({
    status: 'success',
    results: cards.length,
    data: {
      cards
    }
  });
});

/**
 * @description Retrieve a specific credit card record by its unique ID
 * @route GET /api/v1/cards/:id
 * @access Public
 * @param {Object} req - Express request object containing card ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getCard = catchAsync(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(new AppError('No card record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      card
    }
  });
});

/**
 * @description Update an existing credit card record by its unique ID
 * @route PATCH /api/v1/cards/:id
 * @access Public
 * @param {Object} req - Express request object containing card ID in params and update data in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!card) {
    return next(new AppError('No card record found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      card
    }
  });
});

/**
 * @description Permanently delete a credit card record by its unique ID
 * @route DELETE /api/v1/cards/:id
 * @access Public
 * @param {Object} req - Express request object containing card ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndDelete(req.params.id);

  if (!card) {
    return next(new AppError('No card record found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
