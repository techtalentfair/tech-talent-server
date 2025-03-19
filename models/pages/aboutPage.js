const mongoose = require("mongoose");

const landingSchema = require("../schemas/landingSchema");
const meetOurTeamSchema = require("../schemas/meetOurTeamSchema");

const AboutPageSchema = new mongoose.Schema({
  landingSection: {
    type: landingSchema,
    required: true
  },
  meetOurTeam: {
    type: meetOurTeamSchema,
    required: true,
  },
});

const AboutPage = mongoose.model("AboutPage", AboutPageSchema);

module.exports = AboutPage;