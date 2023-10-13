const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Get user data
// Route GET /
// Aces Private
const getUser = asyncHandler(async (req, res) => {
  //find all
  // const users = await User.find();
  res.status(200).json(req.user);
});

// Post create user
// Route POST /api/user
// Aces Public
const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add your email & password");
  }

  //if user already create
  const userCreated = await User.findOne({ email });
  if (userCreated) {
    res.status(400);
    throw new Error("User already create");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  //check if user created
  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Post auth user
// Route POST /api/user/login
// Aces Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Delete user
// Route DELETE /api/user/:id
// Aces Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  //check input
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add your email & password");
  }

  await user.deleteOne();

  res.status(200).json({ id: req.params.id });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  deleteUser,
};
