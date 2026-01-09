const mongoose = require('mongoose');

/**
 * @description User Schema - Defines the structure for user records in MongoDB
 * @property {String} fullname - The full name of the user (required)
 * @property {String} email - The unique email address of the user (required, unique)
 * @property {String} password - The hashed password of the user (required, hidden in queries)
 * @property {Date} createdAt - Automatically generated timestamp for record creation
 * @property {Date} updatedAt - Automatically generated timestamp for record updates
 */
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  }
}, {
  timestamps: true
});

/**
 * @description User Model - Mongoose model for interacting with the 'users' collection
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
