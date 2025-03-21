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
const ROLES = require("../utils/roles");

const signUp = asyncWrapper(async (req, res, next) => {

  if (!req.body) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.BODY), 400);
    return next(error);
  }

  const {
    name,
    email,
    password,
    role
  } = req.body;

  if (!name || !email || !password) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(name, email, password)"), 400);
    return next(error);
  }

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.EXIST, email), 400);
    return next(error);
  }

  if (password.length < 8) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.SHORT_PASSWORD), 400);
    return next(error);
  }

  const encryptedPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: encryptedPassword,
    positions: [],
    role: role ?? ROLES.USER,
  });

  await newUser.save();
  const token = await generateToken({ email: newUser.email, id: newUser._id }, process.env.ACCESS_EXPIRES_IN);

  newUser.password = undefined;
  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.ADDED, "user"),
    code: 201,
    data: {
      newUser,
      token
    }
  });
});

const signIn = asyncWrapper(async (req, res, next) => {

  if (!req.body) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.BODY), 400);
    return next(error);
  }

  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(email, password)"), 400);
    return next(error);
  }

  const oldUser = await User.findOne({ email: email });
  if (!oldUser) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "user"), 400);
    return next(error);
  }

  if (password.length < 8) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.SHORT_PASSWORD), 400);
    return next(error);
  }

  const match = await bcryptjs.compare(password, oldUser.password);
  if (!match) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "password"), 400);
    return next(error);
  }

  const token = await generateToken({ email: oldUser.email, id: oldUser._id }, process.env.REFRESH_EXPIRES_IN);

  oldUser.password = undefined;

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.LOGGED_IN),
    code: 200,
    data: {
      oldUser,
      token
    }
  });
});

const signOut = asyncWrapper(async (req, res, next) => {

  req.headers["Authorization"] = " ";
  req.headers["authorization"] = " ";

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.LOGGED_OUT),
    code: 200
  });
});


module.exports = {
  signUp,
  signIn,
  signOut
};