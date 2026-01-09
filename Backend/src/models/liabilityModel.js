const mongoose = require('mongoose');

/**
 * @description Liability Schema - Defines the structure for liability records in MongoDB
 * @property {String} liabilityName - The name of the liability/debt (required)
 * @property {String} type - The category/type of the liability (required)
 * @property {Number} amount - The total outstanding amount of the liability (required)
 * @property {Number} interestRate - The annual interest rate associated with the liability (required)
 * @property {Date} paymentDueDate - The date when the next payment is due (required)
 * @property {Date} createdAt - Automatically generated timestamp for record creation
 * @property {Date} updatedAt - Automatically generated timestamp for record updates
 */
const liabilitySchema = new mongoose.Schema({
  liabilityName: {
    type: String,
    required: [true, 'Please provide the liability name'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Please provide the liability type'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please provide the amount']
  },
  interestRate: {
    type: Number,
    required: [true, 'Please provide the interest rate']
  },
  paymentDueDate: {
    type: Date,
    required: [true, 'Please provide the payment due date']
  }
}, {
  timestamps: true
});

/**
 * @description Liability Model - Mongoose model for interacting with the 'liabilities' collection
 */
const Liability = mongoose.model('Liability', liabilitySchema);

module.exports = Liability;
