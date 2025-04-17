const mongoose = require('mongoose');
const { validate } = require('./OtherStudentModel');

const fscuStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: Number,
    required: true,
    unique: true,
    length: 7,
    validate: {
      validator: (value) => {
        return /^[1-9]\d{6}$/.test(value);
      },
      message: props => `${props.value} is not a valid FSCU student ID!`
    }
  },
  department: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    enum: {
      values: [1, 2, 3, 4]
    }
  }
}, {
  timestamps: true
});

const FSCUStudent = mongoose.model("FSCUStudent", fscuStudentSchema);

module.exports = FSCUStudent;
