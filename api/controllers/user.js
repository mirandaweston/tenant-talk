const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../models/token_generator");

const signup = async (req, res) => {
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

    const user = (await newUser.save()).toObject();

    delete user.password;

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }, { password: 0 });
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user)
    return res
      .status(401)
      .json({ message: "Username or password is incorrect" });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res
      .status(401)
      .json({ message: "Username or password is incorrect" });

  const token = generateToken(user._id);
  delete user.password;

  return res.status(201).json({ token, user });
};

const updateUser = async (req, res) => {
  try {
    let user = req.body;

    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    }

    user = await User.findOneAndUpdate({ _id: req.userId }, user, {
      projection: { password: 0 },
      new: true,
    });
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, getUser, login, updateUser };
