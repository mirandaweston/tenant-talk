const Property = require("../models/property");
const Review = require("../models/review");
const generateToken = require("../models/token_generator");

const createReview = async (req, res) => {
  try {
    const { property, review } = req.body;

    const propertyKeys = Object.keys(property);

    if (
      (propertyKeys.length === 1 && propertyKeys[0] === "_id") ||
      propertyKeys[0] === "address"
    )
      if (!["_id", "address"].some((key) => key in property)) {
        return res
          .status(400)
          .json({ error: "missing required property details" });
      }

    const newReview = new Review({
      author: req.userId,
      ...review,
    });

    await newReview.save();

    let newProperty;

    if ("_id" in property) {
      newProperty = await Property.findOneAndUpdate(
        { _id: property._id },
        { $push: { reviews: newReview._id } },
        { new: true }
      );
    } else if ("address" in property) {
      newProperty = new Property({
        address: property.address,
        reviews: [newReview._id],
      });
      await newProperty.save();
    }

    const token = generateToken(req.userId);
    return res.status(201).json({ property: newProperty, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createReview };
