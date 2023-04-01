const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  splitAddress: {
    type: Array,
    required: true,
    validate: (v) => v == null || v.length > 0,
  },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    validate: (v) => v == null || v.length > 0,
  },
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
