const mongoose = require('mongoose');

const corporateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  nationalIdFront: {
    type: String,
    required: true,
  },
  nationalIdBack: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Corporate = mongoose.model('Corporate', corporateSchema);

module.exports = Corporate;
