const TYPES = {
  BODY: "body",
  REQUIRED: "required",
  EXIST: "exist",
  SHORT_PASSWORD: "short password",
  ADDED: "add",
  NOT_FOUND: "not found",
  INVALID: "invalid",
  LOGGED_IN: "logged in",
  UPLOAD: "upload",
  RETRIVE: "retrive",
  UPDATE: "update",
  DELETE: "delete",
  AUTHENTICATE: 'authenticate',
  AUTHORIZE: 'authorize',
  LOGGED_OUT: 'logged out',
  SEND: 'send'
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

    case TYPES.AUTHENTICATE:
      message = `You're not authorized!`;
      break;

    case TYPES.AUTHORIZE:
      message = `Permission denied. You do not have access to this resource!`;
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

    case TYPES.UPDATE:
      message = `${field} is updated successfully!`;
      break;

    case TYPES.LOGGED_IN:
      message = `User logged in successfully!`;
      break;

    case TYPES.UPLOAD:
      message = `File uploaded successfully!`;
      break;

    case TYPES.RETRIVE:
      message = `The ${field} retrived successfully!`;
      break;

    case TYPES.DELETE:
      message = `The ${field} is deleted successfully!`;
      break;

    case TYPES.LOGGED_OUT:
      message = `User logged out successfully!`;
      break;

    case TYPES.SEND:
      message = `Email sent successfully!`;
      break;
  }

  return message;
}

module.exports = {
  TYPES,
  getErrorMessage,
  getSuccessMessage
};