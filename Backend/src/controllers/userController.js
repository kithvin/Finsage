const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

/**
 * @description Create a new user record in the database
 * @route POST /api/v1/users
 * @access Public
 * @param {Object} req - Express request object containing user details in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

/**
 * @description Retrieve all user records from the database
 * @route GET /api/v1/users
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

/**
 * @description Retrieve a specific user record by its unique ID
 * @route GET /api/v1/users/:id
 * @access Public
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * @description Update an existing user record by its unique ID
 * @route PATCH /api/v1/users/:id
 * @access Public
 * @param {Object} req - Express request object containing user ID in params and update data in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

/**
 * @description Permanently delete a user record by its unique ID
 * @route DELETE /api/v1/users/:id
 * @access Public
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
