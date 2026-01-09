const mongoose = require('mongoose');

/**
 * @description Card Schema - Defines the structure for credit card records in MongoDB
 * @property {String} cardName - The name of the credit card (required)
 * @property {Number} creditLimit - The maximum credit limit allowed on the card (required)
 * @property {Number} currentBalance - The current outstanding balance on the card (required)
 * @property {Number} apr - The Annual Percentage Rate associated with the card (required)
 * @property {Date} paymentDueDate - The date when the next payment is due (required)
 * @property {Date} createdAt - Automatically generated timestamp for record creation
 * @property {Date} updatedAt - Automatically generated timestamp for record updates
 */
const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: [true, 'Please provide the card name'],
    trim: true
  },
  creditLimit: {
    type: Number,
    required: [true, 'Please provide the credit limit']
  },
  currentBalance: {
    type: Number,
    required: [true, 'Please provide the current balance']
  },
  apr: {
    type: Number,
    required: [true, 'Please provide the APR']
  },
  paymentDueDate: {
    type: Date,
    required: [true, 'Please provide the payment due date']
  }
}, {
  timestamps: true
});

/**
 * @description Card Model - Mongoose model for interacting with the 'cards' collection
 */
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
