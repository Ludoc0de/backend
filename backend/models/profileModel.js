const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    //associate user to profile
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    presentation: {
      type: String,
      required: true,
    },
  },
  // add createat and update date
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
