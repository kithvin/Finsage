import mongoose from "mongoose";

// Define the schema for storing income details in the database
const incomeSchema = new mongoose.Schema(
  {
    incomeSource: {
      type: String,
      required: [true, "Please provide the income source"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide the amount"],
    },
    frequency: {
      type: String,
      required: [true, "Please provide the frequency"],
      enum: ["Weekly", "Bi-weekly", "Monthly", "Yearly", "One-time"],
      default: "Monthly",
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);
export default Income;
