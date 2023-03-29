const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { getPropertyByAddress } = require("../controllers/property");
const { getPropertyById } = require("../controllers/property");

const router = express.Router();

router.get("/address", tokenChecker, getPropertyByAddress);
router.get("/", tokenChecker, getPropertyById);

module.exports = router;
