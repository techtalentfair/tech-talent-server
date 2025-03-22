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
const Email = require("../models/emailModel");
const asyncWrapper = require("../middlewares/asyncWrapper");


// get All ContactUs Emails (Protected Route)
const getEmails = asyncWrapper(async (req, res, next) => {

  const emails = await Email.find({});

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "emails"),
    code: 200,
    data: {
      emails,
    },
  });
});

// Get Single ContactUs Email (Protected Route)
const getEmailById = asyncWrapper(async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
    return next(error);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
    return next(error);
  }

  const email = await Email.findById(id);
  if (!email) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "email"),
      404
    );
    return next(error);
  }

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "email"),
    code: 200,
    data: {
      email,
    },
  });
});

const createEmail = asyncWrapper(async (req, res, next) => {

  const {
    name,
    email,
    phone,
    details
  } = req.body;

  if (!name || !email || !phone || !details) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.REQUIRED, "(name, email, phone, details)"),
      400
    );
    return next(error);
  }

  const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  if (!regex.test(email)) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, 'email'), 400);
    return next(error);
  }

  const newEmail = await Email.create({
    name,
    email,
    phone,
    details
  });

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.ADDED, "email"),
    code: 201,
    data: {
      newEmail,
    },
  });
});

// delete Single ContactUs Email (Protected Route)
const deleteEmailById = asyncWrapper(async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"), 400);
    return next(error);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"), 400);
    return next(error);
  }

  const oldEmail = await Email.findById(id);
  if (!oldEmail) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "email"),
      404
    );
    return next(error);
  }

  await oldEmail.deleteOne();

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.DELETE, "email"),
    code: 204
  });
});

module.exports = {
  getEmails,
  getEmailById,
  createEmail,
  deleteEmailById
}