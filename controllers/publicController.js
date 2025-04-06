const { AppError, STATUS } = require("../utils/appError.js");
const {
  getErrorMessage,
  getSuccessMessage,
  TYPES,
} = require("../utils/getMessage.js");
const Event = require("../models/eventModel.js");
const HomePage = require("../models/pages/homePage.js");
const AboutPage = require("../models/pages/aboutPage.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const Email = require("../models/emailModel.js");

// @desc Get Home Page data
// @route GET /api/home
const getHomePage = asyncWrapper(async (req, res, next) => {
  const homePage = await HomePage.findOne();
  if (!homePage) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "home page")
    );
    return next(error);
  }

  let events;
  events = await Event.find();
  events = events.sort((a, b) => b.date - a.date);

  homePage.upcomingEvents = events[0];

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "home page"),
    data: {
      homePage,
    },
  });
});

// @desc Update Home Page data
// @route PUT /api/home
const updateHomePage = async (req, res, next) => {
  const updatedHomePage = await HomePage.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
  });

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.UPDATE, "Home page"),
    data: {
      updatedHomePage,
    },
  });
};

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
    message: getSuccessMessage(TYPES.RETRIVE, "about page"),
    data: {
      aboutPage,
    },
  });
});

// Update About Page Data (Protected Route)
const updateAboutPage = asyncWrapper(async (req, res, next) => {
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
  getHomePage,
  updateHomePage,
  getAboutPage,
  updateAboutPage,
};
