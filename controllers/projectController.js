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
const Project = require('../models/projectModel');
const asyncWrapper = require('../middlewares/asyncWrapper');

const getProjectById = asyncWrapper(async (req, res, next) => {

	const { id } = req.params;

	if (!id) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
		return next(error);
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
		return next(error);
	}

	const oldProject = await Project.findById(id);
	if (!oldProject) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "project"), 404);
		return next(error);
	}

	res.json({
		status: STATUS.SUCCESS,
		messsage: getSuccessMessage(TYPES.RETRIVE, "project"),
		code: 200,
		data: {
			oldProject
		}
	});
});

const getProjects = asyncWrapper(async (req, res, next) => {

	const projects = await Project.find({});

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.RETRIVE, "projects"),
		code: 200,
		data: {
			projects
		}
	});
});

const createProject = asyncWrapper(async (req, res, next) => {

	const {
		title,
		members,
		details,
		video,
		github
	} = req.body;

	if (!title || !details || !video || !github) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(title, details, video, github)"), 400);
		return next(error);
	}

	const oldProject = await Project.findOne({ title });
	if (oldProject) {
		const error = AppError.create(STATUS.SUCCESS, getErrorMessage(TYPES.UNIQUE, "project"), 400)
		return next(error);
	}

	const newProject = await Project.create({
		title,
		members,
		details,
		video,
		github,
	});

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.ADDED, "project"),
		code: 201,
		data: {
			newProject
		}
	});
});

const deleteProjectById = asyncWrapper(async (req, res, next) => {

	const { id } = req.params;

	if (!id) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
		return next(error);
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
		return next(error);
	}

	const oldProject = await Project.findById(id);
	if (!oldProject) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "project"), 404);
		return next(error);
	}

	await oldProject.deleteOne();

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.DELETE, "project"),
		code: 204
	});
});

const updateProjectById = asyncWrapper(async (req, res, next) => {

	const { id } = req.params;

	if (!id) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
		return next(error);
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
		return next(error);
	}

	const oldProject = await Project.findById(id);
	if (!oldProject) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "project"), 404);
		return next(error);
	}

	console.log(oldProject);

	const {
		title,
		members,
		details,
		video,
		github
	} = req.body;

	if (title && oldProject.title !== title) oldProject.title = title;
	if (details && oldProject.details !== details) oldProject.details = details;
	if (video && oldProject.video !== video) oldProject.video = video;
	if (github && oldProject.github !== github) oldProject.github = github;

	if (members && members.length != 0) {
		members.forEach(member => {
			if (member.length != 0 && !oldProject.members.includes(member)) {
				oldProject.members.push(member);
			}
		});
	}

	await oldProject.save();

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.UPDATE, "project"),
		code: 200,
		data: {
			oldProject
		}
	});
});

module.exports = {
	getProjectById,
	getProjects,
	createProject,
	deleteProjectById,
	updateProjectById
};
