const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  loginUser,
  // forgotPassword,
  // resetPassword,
  deleteUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getUser);
router.post("/", createUser);
// router.post("/forgot", forgotPassword);
// router.post("/reset", resetPassword);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;
