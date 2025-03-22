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

// get All ContactUs Emails (Protected Route)
const getContactUsEmails = asyncWrapper(async (req, res, next) => {
  const Emails = await Email.find({});
  if (!Emails) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "contactus emails")
    );
    return next(error);
  }
  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "contact us emails"),
    data: {
      Emails,
    },
  });
});

// Get Single ContactUs Email (Protected Route)
const getContactUsEmailById = asyncWrapper(async (req, res, next) => {
  const email = await Email.findById(req.params.id);
  if (!email) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "contact us email")
    );
    return next(error);
  }
  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "contact us email"),
    data: {
      email,
    },
  });
});

const createContactUsEmail = asyncWrapper(async (req, res, next) => {
  const { name, email, phone, details } = req.body;
  if (!name || !email || !phone || !details) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.INVALID, "All fields are required")
    );
    return next(error);
  }
  if (await Email.findOne({ email: email })) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.INVALID, "Email already exists")
    );
    return next(error); // if email already exists, return an error and stop the process. 400 Bad Request status code is used here. 409 Conflict status code is also possible.
  }
  const newEmail = new Email({ name, email, phone, details });
  await newEmail.save();

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.CREATE, "ContactUs"),
    data: {
      newEmail,
    },
  });
});

// delete Single ContactUs Email (Protected Route)
const deleteContactUsEmailById = asyncWrapper(async (req, res, next) => {
  const email = await Email.findByIdAndDelete(req.params.id);
  if (!email) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "ContactUs Email ")
    );
    return next(error);
  }
  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.DELETE, "Contact-Us email"),
    data: {
      email,
    },
  });
});
module.exports = {
  getHomePage,
  updateHomePage,
  getAboutPage,
  updateAboutPage,
  getContactUsEmails,
  getContactUsEmailById,
  createContactUsEmail,
  deleteContactUsEmailById,
};
