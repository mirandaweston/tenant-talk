const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const {
  getPropertyByAddress,
  getPropertyById,
  createProperty,
  updateProperty,
} = require("../controllers/property");

const router = express.Router();

router.get("/", getPropertyByAddress);
router.get("/:id", tokenChecker, getPropertyById);
router.patch("/:id", tokenChecker, updateProperty);
router.post("/", tokenChecker, createProperty);

module.exports = router;
