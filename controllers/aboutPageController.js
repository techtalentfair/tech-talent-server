const { AppError, STATUS } = require("../utils/appError");
const AboutPage = require("../models/aboutPage");
const {
  TYPES,
  getErrorMessage,
  getSuccessMessage,
} = require("../utils/getMessage");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Get About Page Data
const getAboutPage = asyncWrapper(async (req, res, next) => {
  const aboutPage = await AboutPage.findOne();
  if (!aboutPage) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "about page")
    );
    return next(error);
  }

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "about"),
    data: {
      aboutPage,
    },
  });
});

// Update About Page Data (Protected Route)
const updateAboutPage = asyncWrapper(async (req, res, next) => {
  if (!req.body) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.BODY));
    return next(error);
  }

  const updatedAboutPage = await AboutPage.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
  });

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.UPDATE, "About page"),
    data: {
      updatedAboutPage,
    },
  });
});

module.exports = {
  getAboutPage,
  updateAboutPage,
};
