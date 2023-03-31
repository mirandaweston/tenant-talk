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

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id, "address reviews")
      .populate({
        path: "reviews",
        select: "_id author createdAt comment overallRating",
        populate: {
          path: "author",
          select: "firstName",
        },
      })
      .lean();
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
