class AppError extends Error {

  static create(status: string, message: string, data?: Object) {
    return {
      status: status,
      message: message,
      data: data?? {}
    };
  }
}

module.exports = {
  AppError
};