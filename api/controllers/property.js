const Property = require("../models/property");
const generateToken = require("../models/token_generator");

const getPropertyByAddress = async (req, res) => {
  const { address } = req.query;

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

module.exports = { getPropertyByAddress };
