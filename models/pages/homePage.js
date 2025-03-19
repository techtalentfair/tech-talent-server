const mongoose = require("mongoose");

const Event = require("../eventModel");
const landingSchema = require("../schemas/landingSchema");
const partnerSchema = require("../schemas/partnerSchema");

const HomePageSchema = new mongoose.Schema({
  landingSection: {
    type: landingSchema
  },
  upcomingEvents: {
    type: [Event.schema],
    required: true
  },
  registerNowDescription: {
    type: String,
    required: true
  },
  ourPartners: {
    type: [partnerSchema],
    required: true
  },
  previousGradsProjects: {
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
  },
});

const HomePage = mongoose.model("HomePage", HomePageSchema);

module.exports = HomePage;
