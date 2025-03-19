const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  video: {
    type: String
  }
}, { _id: false });

module.exports = landingSchema;