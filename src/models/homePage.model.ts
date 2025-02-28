import mongoose, { Schema, Document } from "mongoose";

// Interfaces
interface Event {
    title: string;
    date: string;
    location: string;
}

interface Partner {
    name: string;
    logo: string;
}

interface Project {
    title: string;
    description: string;
    image: string;
}

// Define HomePage interface
export interface IHomePage extends Document {
    landingSection: {
        landingTitle: string;
        landingDescription: string;
        landingImage: string;
    };
    upcomingEvents: {
        events: Event[];
    };
    registerNow: {
        registerDescription: string;
    };
    ourPartners: {
        partners: Partner[];
    };
    previousGradsProjects: {
        projects: Project[];
    };
}

// Define Schema
const HomePageSchema: Schema = new Schema({
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

// Create model
const HomePage = mongoose.model<IHomePage>("HomePage", HomePageSchema);
export default HomePage;
