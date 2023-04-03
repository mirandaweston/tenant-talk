const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    immutable: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
    required: true,
  },
  comment: { type: String, required: true },
  overallRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  landlordRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  conditionRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  neighbourRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  areaRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  warmthRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  parkingRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  petsAllowed: {
    type: Boolean,
    required: true,
    default: false,
  },
  depositReturned: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: { type: String },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
