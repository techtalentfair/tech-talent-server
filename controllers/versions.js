const authControllerV1 = require("./v1/authController");
const emailControllerV1 = require("./v1/emailController");
const eventControllerV1 = require("./v1/eventController");
const fileControllerV1 = require("./v1/fileController");
const projectControllerV1 = require("./v1/projectController");
const publicControllerV1 = require("./v1/publicController");
const registerControllerV1 = require("./v1/registerController");
const subscriberControllerV1 = require("./v1/subscriberController");

// Controllers Version 1
const controllersV1 = {
  authController: authControllerV1,
  emailController: emailControllerV1,
  eventController: eventControllerV1,
  fileController: fileControllerV1,
  projectController: projectControllerV1,
  publicController: publicControllerV1,
  registerController: registerControllerV1,
  subscriberController: subscriberControllerV1,
};

// Controller Versions
module.exports = {
  v1: controllersV1
};