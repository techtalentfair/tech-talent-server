const { AppError, STATUS } = require("../utils/appError");
const {
  TYPES,
  getErrorMessage,
  getSuccessMessage,
} = require("../utils/getMessage");
const Subscriber = require("../models/subscriberModel");
const asyncWrapper = require("../middlewares/asyncWrapper");

// add a new subscriber
const addSubscriber = asyncWrapper(async (req, res, next) => {
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
      getErrorMessage(TYPES.EXISTS, "subscriber with email"),
      400
    );
    return next(error);
  }
  const newSubscriber = await Subscriber.create({ email });
  res.json({
    status: STATUS.SUCCESS,
    success: true,
    message: getSuccessMessage(TYPES.CREATED, "subscriber"),
    data: { newSubscriber },
  });
});
// delete subscriber (Protected Route)

const deleteSubscriberById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const subscriber = await Subscriber.findByIdAndDelete(id);
  if (!subscriber) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "subscriber with email"),
      404
    );
    return next(error);
  }
  res.json({
    status: STATUS.SUCCESS,
    success: true,
    message: getSuccessMessage(TYPES.DELETE, "subscriber"),
    data: { subscriber },
  });
});
// get all subscribers(Protected Route)
const getAllSubscribers = asyncWrapper(async (req, res, next) => {
  const subscribers = await Subscriber.find({});
  if (!subscribers) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "subscribers"),
      404
    );
    return next(error);
  }
  res.json({
    status: STATUS.SUCCESS,
    success: true,
    message: getSuccessMessage(TYPES.RETRIVE, "subscribers"),
    data: { subscribers },
  });
});
// get subscriber by id (Protected Route)
const getSubscriberById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const subscriber = await Subscriber.findById(id);
  if (!subscriber) {
    const error = AppError.create(
      STATUS.FAILED,
      getErrorMessage(TYPES.NOT_FOUND, "subscriber with id"),
      404
    );
    return next(error);
  }
  res.json({
    status: STATUS.SUCCESS,
    success: true,
    message: getSuccessMessage(TYPES.RETRIVE, "subscriber"),
    data: { subscriber },
  });
});
module.exports = {
  addSubscriber,
  deleteSubscriberById,
  getAllSubscribers,
  getSubscriberById,
};
