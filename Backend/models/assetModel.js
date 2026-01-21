import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: [true, "Please provide the asset name"],
      trim: true,
    },
    assetType: {
      type: String,
      required: [true, "Please provide the asset type"],
      trim: true,
    },
    currentValue: {
      type: Number,
      required: [true, "Please provide the current value"],
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model("Asset", assetSchema);
export default Asset;
