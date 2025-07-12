const {
  AppError,
  STATUS
} = require("../../utils/appError");
const {
  TYPES,
  getErrorMessage,
  getSuccessMessage
} = require("../../utils/getMessage");
const uploadToCloudinary = require("../../utils/cloudinary");
const asyncWrapper = require("../../middlewares/asyncWrapper");

const uploadFile = asyncWrapper(async (req, res, next) => {

  if (!req.file) {
    const error = AppError.create(STATUS.FAILED, getErrorMessage(TYPES.REQUIRED, "(file)"));
    return next(error);
  }

  const { mimetype, buffer } = req.file;
  const fileType = mimetype.startsWith("video/") ? "video" : "image";

  const url = await uploadToCloudinary(buffer, fileType);

  res.json({
    status: STATUS.SUCCESS,
    message: getSuccessMessage(TYPES.UPLOAD),
    data: {
      url
    }
  })
});

module.exports = {
  uploadFile
};