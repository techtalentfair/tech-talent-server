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
const Project = require("../models/projectModel");

const getEvents = asyncWrapper(async (req, res, next) => {

    const events = await Event.find();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.RETRIVE, "events"),
        code: 200,
        data: {
            events
        }
    });
});

const createEvent = asyncWrapper(async (req, res, next) => {

    const {
        title,
        date,
        time,
        details,
        location,
        agenda
    } = req.body;

    if (!title || !date || !time || !location) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(title, date, time, location)"), 400);
        return next(error);
    }

    let projectsList = [], separatorsList;
    if (agenda) {

        const {
            projects,
            separators,
        } = agenda;

        if (projects && projects.length != 0) {
            projectsList = await Promise.all(
                projects.map(async (projectId) => {
                    const project = await Project.findById(projectId);
                    if (project) return project;
                })
            );
        }
        separatorsList = separators ? separators : [];
    }

    const { lat, long } = location;

    const event = new Event({
        title,
        date,
        time,
        details,
        location: {
            title: location.title,
            lat,
            long
        },
        images: [],
        agenda: {
            projects: projectsList,
            separators: separatorsList
        }
    });

    await event.save();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.ADDED, "event"),
        code: 201,
        data: {
            event
        }
    });
});


const getEventById = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
        return next(error);
    }

    const event = await Event.findById(id);
    if (!event) {
        const error = AppError.create(getErrorMessage(TYPES.NOT_FOUND, "event"), 404);
        return next(error);
    };

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.RETRIVE, `${event.title}`),
        code: 204,
        data: {
            event
        }
    });
});

const updateEventbyId = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
        return next(error);
    }

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "event"), 404);
        return next(error);
    }

    const {
        title,
        date,
        time,
        location,
        details,
        agenda
    } = req.body;

    if (title && oldEvent.title !== title) oldEvent.title = title;
    if (date && oldEvent.date !== date) oldEvent.date = date;
    if (time && oldEvent.time !== time) oldEvent.time = time;
    if (details && oldEvent.details !== details) oldEvent.details = details;

    if (location) {
        const {
            long,
            lat
        } = location;

        if (location.title && oldEvent.location.title !== location.title) oldEvent.location.title = location.title;
        if (long && oldEvent.location.long !== long) oldEvent.location.long = long;
        if (lat && oldEvent.location.lat !== lat) oldEvent.location.lat = lat;
    }

    if (agenda) {
        const {
            projects,
            separators
        } = agenda;

        if (separators) oldEvent.separators = separators;
        if (projects && projects.length != 0) {
            const projectsList = await Promise.all(
                projects.map(async (projectId) => {
                    const project = await Project.findById(projectId);
                    if (!oldEvent.agenda.projects.includes(project)) {
                        return project;
                    }
                })
            );
            oldEvent.agenda.projects.push(...projectsList);
        }
    }

    await oldEvent.save();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.UPDATE, "event"),
        code: 200,
        data: {
            oldEvent
        }
    });
});

const deleteEventById = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object Id"), 400);
        return next(error);
    }

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "event"), 404);
        return next(error);
    }

    await oldEvent.deleteOne();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.DELETE, "event"),
        code: 204
    });
});


const addImageToEvent = asyncWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
        return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object Id"), 400);
        return next(error);
    }

    if (!req.file) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(file)"), 400);
        return next(error);
    }

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
        const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "event"), 404);
        return next(error);
    }

    const { mimetype, buffer } = req.file;

    const type = mimetype;
    const file_type = type.startsWith("video/") ? "video" : "image";
    const url = await upload(buffer, file_type);

    if (url) {
        oldEvent.images.push(url);
    }
    await oldEvent.save();

    res.json({
        status: STATUS.SUCCESS,
        message: getSuccessMessage(TYPES.UPDATE, "event"),
        code: 200,
        data: {
            event: oldEvent
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
