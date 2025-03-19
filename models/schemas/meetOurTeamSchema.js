const mongoose = require("mongoose");

const cardSchema = require("./cardSchema");

const meetOurTeamSchema = new mongoose.Schema({
  mentorCard: {
    type: cardSchema,
    required: true
  },
  headTeams: {
    type: [cardSchema],
    required: true
  },
}, { _id: false });

module.exports = meetOurTeamSchema;