// controllers/cardController.js
import Card from "../models/cardModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// Controller to create a new card
const createCard = catchAsync(async (req, res) => {
  const newCard = await Card.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      card: newCard,
    },
  });
});

// Controller to retrieve all cards
const getAllCards = catchAsync(async (req, res) => {
  const cards = await Card.find();

  res.status(200).json({
    status: "success",
    results: cards.length,
    data: {
      cards,
    },
  });
});

// Controller to retrieve a single card by ID
const getCard = catchAsync(async (req, res, next) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    return next(new AppError("No card record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      card,
    },
  });
});

// Controller to update a card by ID
const updateCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!card) {
    return next(new AppError("No card record found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      card,
    },
  });
});

// Controller to delete a card by ID
const deleteCard = catchAsync(async (req, res, next) => {
  const card = await Card.findByIdAndDelete(req.params.id);

  if (!card) {
    return next(new AppError("No card record found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export default {
  createCard,
  getAllCards,
  getCard,
  updateCard,
  deleteCard,
};
