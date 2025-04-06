const {
  AppError,
  STATUS
} = require("../utils/appError");
const {
  TYPES,
  getErrorMessage,
} = require("../utils/getMessage");


const User = require("../models/userModel");
const asyncWrapper = require("../middlewares/asyncWrapper");


const allowedTo = (...roles) => {

  return asyncWrapper(async (req, res, next) => {

    const { id } = req.auth;

    const currentUser = await User.findById(id);
    if (!roles.includes(currentUser.role)) {
      const error = AppError.create(STATUS.ERROR, getErrorMessage(TYPES.AUTHORIZE), 403);
      return next(error);
    }
    return next();
  });
};

module.exports = allowedTo;