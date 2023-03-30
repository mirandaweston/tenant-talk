const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { getPropertyByAddress } = require("../controllers/property");

const router = express.Router();

router.get("/address", tokenChecker, getPropertyByAddress);

module.exports = router;
