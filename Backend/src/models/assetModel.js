const mongoose = require('mongoose');

/**
 * @description Asset Schema - Defines the structure for asset records in MongoDB
 * @property {String} assetName - The name of the asset (required)
 * @property {String} assetType - The category/type of the asset (required)
 * @property {Number} currentValue - The current estimated monetary value of the asset (required)
 * @property {Date} createdAt - Automatically generated timestamp for record creation
 * @property {Date} updatedAt - Automatically generated timestamp for record updates
 */
const assetSchema = new mongoose.Schema({
  assetName: {
    type: String,
    required: [true, 'Please provide the asset name'],
    trim: true
  },
  assetType: {
    type: String,
    required: [true, 'Please provide the asset type'],
    trim: true
  },
  currentValue: {
    type: Number,
    required: [true, 'Please provide the current value']
  }
}, {
  timestamps: true
});

/**
 * @description Asset Model - Mongoose model for interacting with the 'assets' collection
 */
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
