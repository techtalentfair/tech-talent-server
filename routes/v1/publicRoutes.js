const express = require("express");

const controller = require("../../controllers/versions").v1.publicController;
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const ROLES = require("../../utils/roles");

const router = express.Router();

router
  .route("/home")
  .get(controller.getHomePage)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.updateHomePage);

router
  .route("/about")
  .get(controller.getAboutPage)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.updateAboutPage);

module.exports = router;
