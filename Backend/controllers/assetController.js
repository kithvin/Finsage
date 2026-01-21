import Asset from "../models/assetModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const createAsset = catchAsync(async (req, res) => {
  const newAsset = await Asset.create(req.body);

  res.status(201).json({
    status: "success",
    data: { asset: newAsset },
  });
});

const getAllAssets = catchAsync(async (req, res) => {
  const assets = await Asset.find();

  res.status(200).json({
    status: "success",
    results: assets.length,
    data: { assets },
  });
});

const getAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    return next(new AppError("No asset record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { asset },
  });
});

const updateAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!asset) {
    return next(new AppError("No asset record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { asset },
  });
});

const deleteAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndDelete(req.params.id);

  if (!asset) {
    return next(new AppError("No asset record found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export default {
  createAsset,
  getAllAssets,
  getAsset,
  updateAsset,
  deleteAsset,
};
