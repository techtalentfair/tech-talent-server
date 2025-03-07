const bcryptjs = require("bcryptjs");

const User = require("../models/userModel");
const {
  AppError,
  STATUS
} = require("../utils/appError");
const {
  TYPES,
  getErrorMessage,
  getSuccessMessage
} = require("../utils/getMessage");
const asyncWrapper = require("../middlewares/asyncWrapper");
const generateToken = require("../utils/generateToken");

const signUp = asyncWrapper(async (req, res, next) => {

  if (!req.body) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.BODY));
    return next(error);
  }

  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(name, email, password)"));
    return next(error);
  }

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.EXIST, email));
    return next(error);
  }

  if (password.length < 8) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.SHORT_PASSWORD));
    return next(error);
  }

  const encryptedPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    name, email, password: encryptedPassword
  });

  await newUser.save();

  const token = await generateToken({ email: newUser.email, id: newUser._id }, process.env.ACCESS_EXPIRES_IN);

  newUser.password = undefined;

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.ADDED, "user"),
    data: {
      newUser,
      token
    }
  });
});

const signIn = asyncWrapper(async (req, res, next) => {

  if (!req.body) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.BODY));
    return next(error);
  }

  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(email, password)"));
    return next(error);
  }

  const oldUser = await User.findOne({ email: email });
  if (!oldUser) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "user"));
    return next(error);
  }

  if (password.length < 8) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.SHORT_PASSWORD));
    return next(error);
  }

  const match = await bcryptjs.compare(password, oldUser.password);
  if (!match) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "password"));
    return next(error);
  }

  const token = await generateToken({ email: oldUser.email, id: oldUser._id }, process.env.REFRESH_EXPIRES_IN);

  oldUser.password = undefined;

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.LOGGED_IN),
    data: {
      oldUser,
      token
    }
  });
});


module.exports = {
  signUp,
  signIn
};