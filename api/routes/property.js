const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { getPropertyById } = require("../controllers/property");

const router = express.Router();

router.get("/", tokenChecker, getPropertyById);

module.exports = router;
