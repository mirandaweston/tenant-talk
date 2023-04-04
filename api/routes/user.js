const express = require("express");
const tokenChecker = require("../middleware/token_checker");
const {
  login,
  signup,
  getUser,
  updateUser,
  updatePassword,
} = require("../controllers/user");

const router = express.Router();

router.post("/signup", signup);
router.get("/", tokenChecker, getUser);
router.post("/login", login);
router.patch("/", tokenChecker, updateUser);
router.patch("/password", tokenChecker, updatePassword);

module.exports = router;
