const mongoose = require("mongoose");

const {
  AppError,
  STATUS
} = require("../../utils/appError");
const {
  TYPES,
  getErrorMessage,
  getSuccessMessage,
} = require("../../utils/getMessage");
const Subscriber = require("../../models/subscriberModel");
const asyncWrapper = require("../../middlewares/asyncWrapper");

// add a new subscriber
const createSubscriber = asyncWrapper(async (req, res, next) => {

  const { email } = req.body;

  if (!email) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.REQUIRED, "(email)"),
      400
    );
    return next(error);
  }

  const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  if (!regex.test(email)) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.INVALID, "email"),
      400
    );
    return next(error);
  }

  const subscriberExists = await Subscriber.findOne({ email });
  if (subscriberExists) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.SUBSCRIBE, email),
      400
    );
    return next(error);
  }

  const newSubscriber = await Subscriber.create({ email });

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.ADDED, "subscriber"),
    code: 201,
    data: {
      newSubscriber
    },
  });
});

// delete subscriber (Protected Route)
const deleteSubscriberById = asyncWrapper(async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"));
    return next(error);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"));
    return next(error);
  }

  const oldSubscriber = await Subscriber.findById(id);
  if (!oldSubscriber) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "subscriber"),
      404
    );
    return next(error);
  }

  await oldSubscriber.deleteOne();

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.DELETE, "subscriber"),
    code: 204
  });
});

// get all subscribers(Protected Route)
const getAllSubscribers = asyncWrapper(async (req, res, next) => {

  const subscribers = await Subscriber.find({});

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "subscribers"),
    code: 200,
    data: {
      subscribers
    },
  });
});
// get subscriber by id (Protected Route)
const getSubscriberById = asyncWrapper(async (req, res, next) => {

  const { id } = req.params;

  if (!id) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(id)"));
    return next(error);
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.INVALID, "Object id"));
    return next(error);
  }

  const subscriber = await Subscriber.findById(id);
  if (!subscriber) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "subscriber"),
      404
    );
    return next(error);
  }

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.RETRIVE, "subscriber"),
    code: 200,
    data: {
      subscriber
    },
  });
});

module.exports = {
  createSubscriber,
  deleteSubscriberById,
  getAllSubscribers,
  getSubscriberById
};
