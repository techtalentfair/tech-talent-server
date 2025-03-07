const express = require("express");

const {
  signUp,
  signIn
} = require("../controllers/authController");

const router = express.Router();

router.route("/sign-up")
  .post(signUp);

router.route("/sign-in")
  .get(signIn);

module.exports = router;