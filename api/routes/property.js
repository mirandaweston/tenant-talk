const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const {
  getPropertyByAddress,
  getPropertyById,
} = require("../controllers/property");

const router = express.Router();

router.get("/", getPropertyByAddress);
router.get("/:id", tokenChecker, getPropertyById);

module.exports = router;
