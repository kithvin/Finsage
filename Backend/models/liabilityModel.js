import mongoose from "mongoose";

const liabilitySchema = new mongoose.Schema(
  {
    liabilityName: {
      type: String,
      required: [true, "Please provide the liability name"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Please provide the liability type"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide the amount"],
    },
    interestRate: {
      type: Number,
      required: [true, "Please provide the interest rate"],
    },
    paymentDueDate: {
      type: Date,
      required: [true, "Please provide the payment due date"],
    },
  },
  { timestamps: true }
);

const Liability = mongoose.model("Liability", liabilitySchema);
export default Liability;
