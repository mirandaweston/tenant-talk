const Property = require("../models/property");

const getPropertiesByAddress = async (req, res) => {
  try {
    const { address } = req.query;

    const splitAddress = address && address.replaceAll(",", "").split(" ");

    const properties =
      (await Property.find(
        address && {
          splitAddress: { $all: splitAddress },
        },
        "-splitAddress"
      ).populate("reviews", "overallRating image")) || [];
    return res.status(200).json({
      properties,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getPropertiesByAddress };
