const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const AboutPageSchema = new Schema({
  landingSection: {
    landingTitle: { type: String, required: true },
    landingSubTitle: { type: String, required: true },
    landingDescription: { type: String, required: true },
    landingImage: { type: String, required: true },
    landingVideo: { type: String, required: true },
  },
  meetOurTeam: {
    mentorCard: { type: CardSchema, required: true },
    headTeams: { type: [CardSchema], required: true },
  },
});

const AboutPageModel = mongoose.model("AboutPage", AboutPageSchema);

module.exports = AboutPageModel;