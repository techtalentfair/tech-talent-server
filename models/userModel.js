const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    min: 3
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    min: 8,
  }
});

const User = mongoose.model("User", userScheme);

module.exports = User;