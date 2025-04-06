const express = require("express");

const {
  signUp,
  signIn,
  signOut,
  forgetPassword
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/sign-up")
  .post(signUp);

router.route("/sign-in")
  .get(signIn);

router.route("/forget-password")
  .post(forgetPassword);

router.route("/sign-out")
  .get(verifyToken, signOut);

module.exports = router;