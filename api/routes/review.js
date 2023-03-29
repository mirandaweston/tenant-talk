const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { createReview } = require("../controllers/review");

const router = express.Router();

// router.post("/new", tokenChecker, createReview);
router.post("/new", createReview);

module.exports = router;
