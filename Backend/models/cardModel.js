// models/cardModel.js
import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    cardName: {
      type: String,
      required: [true, "Please provide the card name"],
      trim: true,
    },
    creditLimit: {
      type: Number,
      required: [true, "Please provide the credit limit"],
    },
    currentBalance: {
      type: Number,
      required: [true, "Please provide the current balance"],
    },
    apr: {
      type: Number,
      required: [true, "Please provide the APR"],
    },
    paymentDueDate: {
      type: Date,
      required: [true, "Please provide the payment due date"],
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
