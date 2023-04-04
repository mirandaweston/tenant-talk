const Property = require("../models/property");
const generateToken = require("../models/token_generator");
const Review = require("../models/review");

const createReview = (author, property, review) =>
  new Review({
    author,
    property,
    ...review,
  });

const getPropertyByAddress = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address)
      return res.status(400).json({ message: "missing required details" });

    const property = await Property.findOne(
      {
        address,
      },
      "-splitAddress"
    );
    return res.status(200).json({
      property,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({ property, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createProperty = async (req, res) => {
  const { property, review } = req.body;

  // property must contain an address
  const isValidProperty =
    Object.keys(property).length === 1 && "address" in property;

  if (!isValidProperty) {
    return res
      .status(400)
      .json({ message: "property must contain an address" });
  }

  try {
    const splitAddress = property.address.replaceAll(",", "").split(" ");

    const newProperty = new Property({
      address: property.address,
      splitAddress,
      reviews: [],
    });

    const newReview = createReview(req.userId, newProperty._id, review);

    newProperty.reviews.push(newReview._id);

    await newReview.save();
    await newProperty.save();

    const token = generateToken(req.userId);
    return res.status(201).json({ property: newProperty, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;

    const newReview = createReview(req.userId, id, review);

    await newReview.save();

    const property = await Property.findOneAndUpdate(
      { _id: id },
      { $push: { reviews: newReview._id } },
      {
        projection: { splitAddress: 0 },
        new: true,
      }
    ).lean();

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const token = generateToken(req.userId);
    return res.status(200).json({ property, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPropertyById,
  getPropertyByAddress,
  createProperty,
  updateProperty,
};
