const express = require("express");
const { getPropertyByAddress } = require("../controllers/property");

const router = express.Router();

router.get("/address", getPropertyByAddress);

module.exports = router;
