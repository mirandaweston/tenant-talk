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

const getPropertyReviews = async (req, res) => {
  try {
    // propertyId is passed as a query parameter
    const { propertyId } = req.query;

    const { reviews } = await Property.findById(propertyId)
      .populate("reviews")
      .select("-__v");

    const token = await generateToken(req.userId);
    console.log(reviews);
    // Reviews won't exist if property doesn't exist within the database (a property only exists with a review)

    // Map the reviews to a new array with only the fields we want to return
    const propertyReviews = reviews.map((review) => {
      return {
        id: review.id,
        author: review.author.firstName,
        comment: review.comment,
        createdAt: review.createdAt,
        overallRating: review.overallRating,
      };
    });
    return res.status(200).json({ propertyReviews, token });
     
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getPropertyById, getPropertyByAddress, getPropertyReviews };

