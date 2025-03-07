const TYPES = {
  BODY: "body",
  REQUIRED: "required",
  EXIST: "exist",
  SHORT_PASSWORD: "short password",
  ADDED: "add",
  NOT_FOUND: "not found",
  INVALID: "invalid",
  LOGGED_IN: "logged in",
  UPLOAD: "upload"
};

const getErrorMessage = (type, field) => {
  let message;

  switch (type) {
    case TYPES.BODY:
      message = "Missing Request Body!";
      break;

    case TYPES.REQUIRED:
      message = `Missing Required Parameters ${field}!`;
      break;

    case TYPES.EXIST:
      message = `The email ${field} is already used!`;
      break;

    case TYPES.SHORT_PASSWORD:
      message = `The password should be at least 8 characters!`;
      break;

    case TYPES.NOT_FOUND:
      message = `The ${field} is not found!`;
      break;

    case TYPES.INVALID:
      message = `Invalid ${field}!`;
      break;

    case TYPES.UPLOAD:
      message = `Failed to upload the file!`;
      break;
  }

  return message;
}

const getSuccessMessage = (type, field) => {
  let message;

  switch (type) {
    case TYPES.ADDED:
      message = `Added new ${field}!`;
      break;

    case TYPES.LOGGED_IN:
      message = `User logged in successfully!`;
      break;

    case TYPES.UPLOAD:
      message = `File uploaded successfully!`;
      break;
  }

  return message;
}

module.exports = {
  TYPES,
  getErrorMessage,
  getSuccessMessage
};