import mongoose from "mongoose";
const { Schema } = mongoose;

const HomePageSchema = new Schema({
  landingSection: {
    landingTitle: { type: String, required: true },
    landingDescription: { type: String, required: true },
    landingImage: { type: String, required: true },
  },
  upcomingEvents: {
    events: [
      {
        title: { type: String, required: true },
        date: { type: String, required: true },
        location: { type: String, required: true },
      },
    ],
  },
  registerNow: {
    registerDescription: { type: String, required: true },
  },
  ourPartners: {
    partners: [
      {
        name: { type: String, required: true },
        logo: { type: String, required: true },
      },
    ],
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
export default HomePage;
