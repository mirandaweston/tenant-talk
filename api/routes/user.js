const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const { signup, getUser } = require("../controllers/user");

const router = express.Router();

router.post("/signup", signup);
router.get("/", tokenChecker, getUser);

module.exports = router;
