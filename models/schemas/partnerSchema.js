const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  logo: {
    type: String,
    required: true
  }
}, { _id: false });

module.exports = partnerSchema;