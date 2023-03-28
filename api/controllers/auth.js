const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../models/token_generator");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    console.log(newUser);
    const savedUser = (await newUser.save()).toObject();

    delete savedUser.password;
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    res.status(401).json({ message: "Username or password is incorrect" });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = generateToken(user._id);
      delete user.password;
      delete user._id;
      delete user.__v;
      res.status(201).json({ token, message: "Login Successful", user });
    } else {
      res.status(401).json({ message: "Username or password is incorrect" });
    }
    // res.status(201).json({ token, user });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }, "username name email");
    const token = generateToken(req.userId);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser, getUser, login };
