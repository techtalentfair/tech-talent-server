const mongoose = require("mongoose");

const separatorSchema = new mongoose.Schema({
  title: {
    type: String
  },
  date: {
    type: String,
  },
  time: {
    type: String
  },
  location: {
    type: String,
  },
  description: {
    type: String
  }
}, { _id: false });

module.exports = separatorSchema;