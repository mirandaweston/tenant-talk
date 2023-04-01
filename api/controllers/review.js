const Property = require("../models/property");
const Review = require("../models/review");
const generateToken = require("../models/token_generator");

const createReview = async (req, res) => {
  const { property, review } = req.body;

  // property can only contain an id or an address
  const isValidProperty =
    Object.keys(property).length === 1 &&
    ("_id" in property || "address" in property);

  if (!isValidProperty) {
    return res.status(400).json({ error: "missing required property details" });
  }

  try {
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
        { new: true, projection: { splitAddress: 0 } }
      );
      if (!newProperty)
        return res.status(400).json({ error: "property not found" });
    }

    if ("address" in property) {
      const splitAddress = property.address.replaceAll(",", "").split(" ");

      newProperty = await Property.create({
        address: property.address,
        splitAddress,
        reviews: [newReview._id],
      });
    }

    const token = generateToken(req.userId);
    return res.status(201).json({ property: newProperty, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createReview };
