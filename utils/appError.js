class AppError extends Error {
  static create(status, message, data) {
    return {
      status,
      message,
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