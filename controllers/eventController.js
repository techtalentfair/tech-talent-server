const mongoose = require("mongoose");

const {
    AppError,
    STATUS
} = require("../utils/appError");
const {
    TYPES,
    getErrorMessage,
    getSuccessMessage
} = require("../utils/getMessage");
const Event = require("../models/eventModel");
const upload = require("../utils/cloudinary");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getEvents = asyncWrapper(async (req, res, next) => {

    const events = await Event.find();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.RETRIVE, "events"),
        data: {
            events
        }
    });
});

const createEvent = asyncWrapper(async (req, res, next) => {


    const { title, date, time, details, location, agenda } = req.body;

    if (!title || !date || !time || !location) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(title, date, time, location)"));
        return next(error);
    }

    // TODO: wait for philopater Project Model!
    // TODO: the agenda.projects contains ObjectId's to retrive all coresponding projects.
    let projects, separators;
    if (agenda) {
        projects = agenda.projects ? agenda.projects : [];
        separators = agenda.separators ? agenda.separators : [];
    }

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
        images: [],
        agenda: {
            projects,
            separators
        }
    });

    if (req.files) {
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

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.ADDED, "event"),
        data: {
            event
        }
    });
});


const getEventById = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"));
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"));
        return next(error);
    }

    const event = await Event.findById(id);
    if (!event) {
        const error = AppError.getErrorMessage(TYPES.NOT_FOUND, "event");
        return next(error);
    };

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.RETRIVE, `${event.title}`),
        data: {
            event
        }
    });
});

const updateEventbyId = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"));
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"));
        return next(error);
    }

    const event = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!event) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "event"));
        return next(error);
    }

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.UPDATE, "event"),
        data: {
            event
        }
    });
});

const deleteEventById = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"));
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object Id"));
        return next(error);
    }

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "event"));
        return next(error);
    }

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.DELETE, "event")
    });
});


const addImageToEvent = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"));
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object Id"));
        return next(error);
    }

    if (!req.file) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(file)"));
        return next(error);
    }

    const event = await Event.findById(id);
    if (!event) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "event"));
        return next(error);
    }

    const { mimetype, buffer } = req.file;

    const type = mimetype;
    const file_type = type.startsWith("video/") ? "video" : "image";
    const result = await upload(buffer, file_type);

    event.images.push(result.secure_url);
    await event.save();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.UPDATE, "event"),
        data: {
            event
        }
    });
});

module.exports = {
    getEvents,
    getEventById,
    addImageToEvent,
    createEvent,
    deleteEventById,
    updateEventbyId
};
