import mongoose, { Schema, Document } from "mongoose";

interface Card {
  title: string;
  description: string;
  image: string;
}

interface AboutPage extends Document {
  landingSection: {
    landingTitle: string;
    landingSubTitle: string;
    landingDescription: string;
    landingImage: string;
    landingVideo: string;
  };
  meetOurTeam: {
    mentorCard: Card;
    headTeams: Card[];
  };
}

const CardSchema = new Schema<Card>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

const AboutPageSchema = new Schema<AboutPage>({
  landingSection: {
    landingTitle: { type: String, required: true },
    landingSubTitle: { type: String, required: true },
    landingDescription: { type: String, required: true },
    landingImage: { type: String, required: true },
    landingVideo: { type: String, required: true },
  },
  meetOurTeam: {
    mentorCard: { type: CardSchema, required: true },
    headTeams: { type: [CardSchema], required: true }
  }
});

export const AboutPageModel = mongoose.model<AboutPage>("AboutPage", AboutPageSchema);
// ...