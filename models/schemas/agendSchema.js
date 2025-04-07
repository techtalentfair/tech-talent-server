const mongoose = require("mongoose");
const separatorSchema = require("./separatorSchema");
const Project = require("../projectModel");

const agendaSchema = new mongoose.Schema({

  projects: {
    type: [Project.schema]
  },
  separators: {
    type: [separatorSchema]
  }
}, { _id: false });

module.exports = agendaSchema;