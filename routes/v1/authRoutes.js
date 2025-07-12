const express = require("express");

const controller = require("../../controllers/versions").v1.authController;
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.route("/sign-up")
  .post(controller.signUp);

router.route("/sign-in")
  .get(controller.signIn);

router.route("/forget-password")
  .post(controller.forgetPassword);

router.route("/sign-out")
  .get(verifyToken, controller.signOut);

module.exports = router;