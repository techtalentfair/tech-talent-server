const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
}, { _id: false });


module.exports = locationSchema;