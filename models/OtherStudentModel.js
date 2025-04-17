const mongoose = require('mongoose');

const otherStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
    unique: true,
    length: 14
  },
  university: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  }
}, {
  timestamps: true
});

const OtherStudent = mongoose.model('OtherStudent', otherStudentSchema);

module.exports = OtherStudent;
