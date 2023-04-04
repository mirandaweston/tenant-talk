const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { getReviewById } = require("../controllers/review");

const router = express.Router();

router.get("/:id", tokenChecker, getReviewById);

module.exports = router;
