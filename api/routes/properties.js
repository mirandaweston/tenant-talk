const express = require("express");
const { getPropertiesByAddress } = require("../controllers/properties");

const router = express.Router();

router.get("/", getPropertiesByAddress);

module.exports = router;
