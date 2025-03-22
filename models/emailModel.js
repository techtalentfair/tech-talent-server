const mongoose = require("mongoose");

const EmailScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"]
  },
  email: {
    type: String,
    required: [true, "Eamil is required!"]
  },
  phone: {
    type: String,
    required: [true, "Phone is required!"]
  },
  details: {
    type: String,
    required: [true, "Details is required!"]
  },
});

const Email = mongoose.model("Email", EmailScheme);

module.exports = Email;
