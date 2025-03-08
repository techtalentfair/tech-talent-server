const {
  AppError,
  STATUS
} = require("../utils/appError.js");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES
} = require("../utils/getMessage.js");
const HomePage = require("../models/homePage.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js")

// @desc Get Home Page data
// @route GET /api/home
const getHomePage = asyncWrapper(async (req, res, next) => {
  const homePage = await HomePage.findOne();
  if (!homePage) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "home page"))
    return next(error);
  }

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "home"),
    data: {
      homePage
    }
  });
});

// @desc Update Home Page data
// @route PUT /api/home
const updateHomePage = async (req, res, next) => {

  if (!req.body) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.BODY));
    return next(error);
  }

  const updatedHomePage = await HomePage.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
  });

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.UPDATE, "Home page"),
    data: {
      updatedHomePage
    }
  });

};

module.exports = {
  getHomePage,
  updateHomePage
}