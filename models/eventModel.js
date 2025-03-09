const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
        title: { type: String, required: true },
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
    },
    details: { type: String, required: false },
    images: { type: [String], required: false },
    agenda: {
        projects: [
        {
            name: { type: String, required: false },
            description: { type: String, required: false },
        },
        ],
        separators: [
        {
            title: { type: String, required: false },
        },
        ],
    },
});

module.exports = mongoose.model("Event", EventSchema);
