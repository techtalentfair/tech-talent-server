class AppError extends Error {
  static create(status, message, code, data) {
    return {
      status,
      message,
      code,
      data
    };
  }
}

const STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
  ERROR: "error"
};

module.exports = {
  AppError,
  STATUS
};