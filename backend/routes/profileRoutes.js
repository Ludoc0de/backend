//Profile routes
const express = require("express");
const router = express.Router();
const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getProfile);
router.post("/", protect, createProfile);
router.put("/:id", protect, updateProfile);
router.delete("/:id", protect, deleteProfile);

module.exports = router;
