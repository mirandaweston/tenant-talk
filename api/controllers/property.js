const Property = require("../models/property");
const generateToken = require("../models/token_generator");

const getPropertyByAddress = async (req, res) => {
  try {
    const { terms, address } = req.query;

    let properties;
    let property;

    if (terms) {
      properties = await Property.find({
        addressTerms: { $all: terms },
      }).populate("reviews", "overallRating");
    }

    if (address) {
      property = await Property.findOne({
        address,
      });
    }
    const token = generateToken(req.userId);
    res.status(200).json({
      [property ? "property" : "properties"]: property || properties,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPropertyByAddress };
