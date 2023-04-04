const Review = require("../models/review");
const generateToken = require("../models/token_generator");

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id)
      .populate({
        path: "author",
        select: "firstName",
      })
      .populate({
        path: "property",
        select: "address",
      })
      .lean();
    const token = generateToken(req.userId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.status(200).json({ review, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getReviewById };
