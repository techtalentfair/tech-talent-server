const Event = require("../models/eventModel");


const upload  = require("../utils/cloudinary"); 

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createEvent = async (req, res) => {
    try {
        const { title, date, time, details, location, agenda } = req.body;

        if (!title || !date || !time || !location) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const projects = agenda.projects ;
        const separators = agenda.separators ;

        const { lat, long } = location;
        const event = new Event({
            title,
            date,
            time,
            details,
            location: {
                title,
                lat,
                long
            },
            agenda: {
                projects,
                separators,
            }, 
            images: []
        });
        if (req.files ) {
            const uploadedImages = await Promise.all(
                req.files.map(async (file) => {  
                    const type = file.mimetype.startsWith("video/") ? "video" : "image";
                    const result = await upload(file.buffer, type);
                    return result.secure_url;
                })
            );
            event.images = uploadedImages;
        }

        await event.save();

        res.status(201).json(event);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEventbyId = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addImageToEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const type = req.file.mimetype;
        const file_type = type.startsWith("video/") ? "video" : "image";
        const result = await upload(req.file.buffer, file_type);
        
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        event.images.push(result.secure_url);
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = exports;