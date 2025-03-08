const {
  AppError,
  STATUS
} = require("../utils/appError");
const AboutPageModel = require("../models/aboutPage.model");
const {
  TYPES,
  getErrorMessage,
  getSuccessMessage
} = require("../utils/getMessage");

// Get About Page Data
const getAboutPage = async (req, res) => {

  const aboutPage = await AboutPageModel.findOne();
  if (!aboutPage) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.NOT_FOUND, "about page"));
    return next(error);
  }

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "about"),
    data: {
      aboutPage
    }
  });
};

// Update About Page Data (Protected Route)
const updateAboutPage = async (req, res) => {
  try {
    let aboutPage = await AboutPageModel.findOne();
    if (!aboutPage) {
      aboutPage = new AboutPageModel(req.body);
    } else {
      Object.assign(aboutPage, req.body);
    }
    await aboutPage.save();
    res.json({ message: "Updated successfully", data: aboutPage });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getAboutPage,
  updateAboutPage
};