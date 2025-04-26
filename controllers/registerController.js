const mongoose = require("mongoose");
const { AppError, STATUS } = require("../utils/appError");
const { TYPES, getErrorMessage, getSuccessMessage } = require("../utils/getMessage");
const FSCUStudent = require('../models/FSCUStudentModel');
const OtherStudent = require('../models/OtherStudentModel');
const Corporate = require('../models/CorporateModel');
const asyncWrapper = require('../middlewares/asyncWrapper');

const processAttendant = asyncWrapper(async (req, res, next) => {
	if (!req.body || !req.body.type) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(type)"), 400);
		return next(error);
	}
	const attendantType = req.body.type;

	let result;

	try {
		switch (attendantType.toLowerCase()) {
			case 'fscu_student':
				result = await processFSCUStudent(req.body);
				break;
			case 'other_student':
				result = await processOtherStudent(req.body);
				break;
			case 'corporate':
				result = await processCorporate(req.body);
				break;
			default:
				const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "attendant type"), 400);
				return next(error);
		}

		res.json({
			status: STATUS.SUCCESS,
			message: getSuccessMessage(TYPES.ADDED, attendantType),
			code: 201,
			data: {
				attendant: result
			}
		});
	} catch (error) {
		if (error.code === 11000) {
			const duplicateError = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.UNIQUE, "attendant"), 409);
			return next(duplicateError);
		}
		return next(error);
	}
});

const processFSCUStudent = async (data) => {
	const { name, studentId, department, level } = data;

	if (!name || !studentId || !department || !level) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(name, studentId, department, level)"), 400);
	}

	// Convert studentId to number for validation
	const numericStudentId = Number(studentId);
	if (isNaN(numericStudentId)) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "student ID"), 400);
	}

	const oldStudent = await FSCUStudent.findOne({ studentId: numericStudentId });
	if (oldStudent) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.UNIQUE, "FSCU student"), 400);
	}

	const newStudent = await FSCUStudent.create({
		name,
		studentId: numericStudentId,
		department,
		level
	});

	return newStudent;
};

const processOtherStudent = async (data) => {
	const { name, studentId, faculty, nationalId, university, level } = data;

	if (!name || !studentId || !faculty || !nationalId || !university || !level) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(name, studentId, faculty, nationalId, university, level)"), 400);
	}

	const nationalIdRegex = /^[2-3]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{6}$/;
	if (!nationalIdRegex.test(nationalId)) {
		throw AppError.create(
			STATUS.FAILED,
			getErrorMessage(TYPES.INVALID, "national ID format"),
			400
		);
	}

	const oldStudent = await OtherStudent.findOne({
		$or: [{ studentId }, { nationalId }]
	});

	if (oldStudent) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.UNIQUE, "student"), 400);
	}

	const newStudent = await OtherStudent.create({
		name,
		studentId,
		faculty,
		nationalId,
		university,
		level: Number(level)
	});

	return newStudent;
};

const processCorporate = async (data) => {
	const { name, companyName, nationalIdFront, nationalIdBack, email, phoneNumber } = data;

	if (!name || !companyName || !nationalIdFront || !nationalIdBack || !email || !phoneNumber) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(name, companyName, nationalIdFront, nationalIdBack, email, phoneNumber)"), 400);
	}

	if (phoneNumber.length !== 11) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "phone number"), 400);
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "email"), 400);
	}

	const oldCorporate = await Corporate.findOne({ email });
	if (oldCorporate) {
		throw AppError.create(STATUS.FAILED, getErrorMessage(TYPES.UNIQUE, "corporate attendant"), 400);
	}

	const newCorporate = await Corporate.create({
		name,
		companyName,
		nationalIdFront,
		nationalIdBack,
		email,
		phoneNumber
	});

	return newCorporate;
};

const getAttendantsByType = asyncWrapper(async (req, res, next) => {
	const { type } = req.params;

	if (!type) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(type)"), 400);
		return next(error);
	}

	let attendants;

	switch (type.toLowerCase()) {
		case 'fscu_student':
			attendants = await FSCUStudent.find({});
			break;
		case 'other_student':
			attendants = await OtherStudent.find({});
			break;
		case 'corporate':
			attendants = await Corporate.find({});
			break;
		default:
			const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "attendant type"), 400);
			return next(error);
	}

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.RETRIVE, `${type} attendants`),
		code: 200,
		data: {
			attendants
		}
	});
});

const getAttendantById = asyncWrapper(async (req, res, next) => {
	const { type, id } = req.params;

	if (!type || !id) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(type, id)"), 400);
		return next(error);
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
		return next(error);
	}

	let attendant;

	switch (type.toLowerCase()) {
		case 'fscu_student':
			attendant = await FSCUStudent.findById(id);
			break;
		case 'other_student':
			attendant = await OtherStudent.findById(id);
			break;
		case 'corporate':
			attendant = await Corporate.findById(id);
			break;
		default:
			const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "attendant type"), 400);
			return next(error);
	}

	if (!attendant) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, `${type} attendant`), 404);
		return next(error);
	}

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.RETRIVE, `${type} attendant`),
		code: 200,
		data: {
			attendant
		}
	});
});

const deleteAttendantById = asyncWrapper(async (req, res, next) => {
	const { type, id } = req.params;

	if (!type || !id) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(type, id)"), 400);
		return next(error);
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
		return next(error);
	}

	let attendant;

	switch (type.toLowerCase()) {
		case 'fscu_student':
			attendant = await FSCUStudent.findById(id);
			break;
		case 'other_student':
			attendant = await OtherStudent.findById(id);
			break;
		case 'corporate':
			attendant = await Corporate.findById(id);
			break;
		default:
			const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "attendant type"), 400);
			return next(error);
	}

	if (!attendant) {
		const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, `${type} attendant`), 404);
		return next(error);
	}

	await attendant.deleteOne();

	res.json({
		status: STATUS.SUCCESS,
		message: getSuccessMessage(TYPES.DELETE, `${type} attendant`),
		code: 204
	});
});

module.exports = {
	processAttendant,
	getAttendantsByType,
	getAttendantById,
	deleteAttendantById
};
