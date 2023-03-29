const Property = require("../models/property");
const Review = require("../models/review");
const generateToken = require("../models/token_generator");

const getPropertyByAddress = async (req, res) => {
  const { address } = req.body;
  try {
    const property = await Property.findOne({ address }).populate(
      "reviews",
      "overallRating"
    );
    const token = generateToken(req.userId);
    res.status(200).json({ property, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const property = await Property.findById(propertyId)
      .populate("reviews")
      .select("-__v");

    const token = generateToken(req.userId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    return res.status(200).json({ property, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getPropertyById, getPropertyByAddress };
