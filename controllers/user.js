const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email })
    .populate("wishlist")
    .populate({ path: "cart", model: "Product" });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(200).json({
    status: true,
    message: "Login successful",
    user: { user, token },
  });
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "all fields are required",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        status: false,
        message: "Username already exists",
      });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(409).json({
        status: false,
        message: "User email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "internal server error",
    });
  }
};

const emptyCart = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.cart = [];

    await user.save();

    res.status(200).json({ status: true, message: "Cart items removed" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  signup,
  emptyCart,
};
