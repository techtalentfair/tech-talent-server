const authRoutesV1 = require("./v1/authRoutes");
const emailRoutesV1 = require("./v1/emailRoutes");
const eventRoutesV1 = require("./v1/eventRoutes");
const fileRoutesV1 = require("./v1/fileRoutes");
const projectRoutesV1 = require("./v1/projectRoutes");
const publicRoutesV1 = require("./v1/publicRoutes");
const registerRoutesV1 = require("./v1/registerRoutes");
const subscriberRoutesV1 = require("./v1/subscriberRoutes");


// Routes Version 1
const routesV1 = {
  authRoutes: authRoutesV1,
  emailRoutes: emailRoutesV1,
  eventRoutes: eventRoutesV1,
  fileRoutes: fileRoutesV1,
  projectRoutes: projectRoutesV1,
  publicRoutes: publicRoutesV1,
  registerRoutes: registerRoutesV1,
  subscriberRoutes: subscriberRoutesV1,
}

// Routes Versions
module.exports = {
  v1: routesV1
};