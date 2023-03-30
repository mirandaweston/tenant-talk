const Property = require("../models/property");
const generateToken = require("../models/token_generator");

const getPropertyByAddress = async (req, res) => {
  const { terms } = req.query;

  try {
    const properties = await Property.find({
      addressTerms: { $all: terms },
    }).populate("reviews", "overallRating");
    const token = generateToken(req.userId);
    res.status(200).json({ properties, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPropertyByAddress };
