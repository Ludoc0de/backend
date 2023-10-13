const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");

// Get profile user data
// Get allProfile user data
// Route GET /api/profile
// Aces Private
const getProfile = asyncHandler(async (req, res) => {
  const profiles = await Profile.find({ user: req.user.id });
  res.status(200).json(profiles);
});

// Post create user profile
// Route POST /api/profile
// Aces Private
const createProfile = asyncHandler(async (req, res) => {
  // add picture later in const
  const { firstName, lastName, address, phone, presentation } = req.body;
  if (!firstName || !lastName || !address || !phone || !presentation) {
    res.status(400);
    throw new Error("Please add all your information");
  }
  // Create profile
  const profile = await Profile.create({
    firstName: firstName,
    lastName: lastName,
    address: address,
    phone: phone,
    presentation: presentation,
    user: req.user.id,
  });
  res.status(200).json(profile);
});

// Put update user profile
// Route PUT /api/profile/:id
// Aces Private
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, phone, presentation } = req.body;
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    res.status(400);
    throw new Error("Profile not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the profile user
  if (profile.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedProfile);
});

// Delete user
// Route DELETE /api/profile/:id
// Aces Private
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) {
    res.status(400);
    throw new Error("User not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the profile user
  if (profile.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await profile.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
