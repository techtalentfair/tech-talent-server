const mongoose = require("mongoose");
const separatorSchema = require("./separatorSchema");

const agendaSchema = new mongoose.Schema({

  // TODO: add list of projects
  separators: {
    type: [separatorSchema]
  }
}, { _id: false });

module.exports = agendaSchema;