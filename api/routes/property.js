const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const {
  getPropertyByAddress,
  getPropertyById,
  getPropertyReviews,
} = require("../controllers/property");

const router = express.Router();

router.get("/address", tokenChecker, getPropertyByAddress);
router.get("/", tokenChecker, getPropertyById);
router.get("/reviews", tokenChecker, getPropertyReviews);

module.exports = router;
