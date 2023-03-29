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
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
