const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: String,
  },
  url: {
    type: String,
    required: true
  }
}, { _id: false });

module.exports = linkSchema