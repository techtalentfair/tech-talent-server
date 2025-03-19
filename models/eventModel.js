const mongoose = require("mongoose");

const agendaSchema = require("./schemas/agendSchema");
const locationSchema = require("./schemas/locationSchema");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: locationSchema
    },
    details: {
        type: String
    },
    images: {
        type: [String],
        default: []
    },
    agenda: {
        type: agendaSchema
    },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
