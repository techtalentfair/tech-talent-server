const jwt = require("jsonwebtoken");

const {
  AppError,
  STATUS
} = require("../utils/appError");
const {
  TYPES,
  getErrorMessage
} = require("../utils/getMessage");


const verifyToken = (req, res, next) => {

  const authHeader = req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = AppError.create(STATUS.ERROR, getErrorMessage(TYPES.AUTHENTICATE), 401);
    return next(error);
  }

  const token = authHeader.split(' ')[1];
  try {
    const auth = jwt.verify(token, process.env.TOKEN_SECRET);
    req.auth = auth;
    next();
  } catch (err) {
    const error = AppError.create(STATUS.ERROR, getErrorMessage(TYPES.INVALID, 'token'), 401);
    return next(error);
  }
};

module.exports = verifyToken;