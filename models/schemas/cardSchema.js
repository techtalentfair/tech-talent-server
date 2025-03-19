const mongoose = require("mongoose");

const linkSchema = require("./linksSchema");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  links: {
    type: [linkSchema]
  }
}, { _id: false });

module.exports = cardSchema;