const mongoose = require('mongoose');

const separatorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },    
  description: {
    type: String,
  }
}, {
  timestamps: true
});

const Separator = mongoose.model('Separator', separatorSchema);

module.exports = Separator;
