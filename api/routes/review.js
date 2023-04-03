const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { createReview, getReviewById } = require("../controllers/review");

const router = express.Router();

router.post("/new", tokenChecker, createReview);
router.get("/:id", tokenChecker, getReviewById);

module.exports = router;
