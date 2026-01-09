const mongoose = require('mongoose');

/**
 * @description Income Schema - Defines the structure for income records in MongoDB
 * @property {String} incomeSource - The source of the income (required)
 * @property {Number} amount - The monetary value of the income (required)
 * @property {String} frequency - How often the income is received (required, enum: Weekly, Bi-weekly, Monthly, Yearly, One-time)
 * @property {Date} createdAt - Automatically generated timestamp for record creation
 * @property {Date} updatedAt - Automatically generated timestamp for record updates
 */
const incomeSchema = new mongoose.Schema({
  incomeSource: {
    type: String,
    required: [true, 'Please provide the income source'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide the amount']
  },
  frequency: {
    type: String,
    required: [true, 'Please provide the frequency'],
    enum: ['Weekly', 'Bi-weekly', 'Monthly', 'Yearly', 'One-time'],
    default: 'Monthly'
  }
}, {
  timestamps: true
});

/**
 * @description Income Model - Mongoose model for interacting with the 'incomes' collection
 */
const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
