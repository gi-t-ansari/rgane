const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  subscription: { type: String, default: "free" },
});

module.exports = mongoose.model("User", UserSchema);
