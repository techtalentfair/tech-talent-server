const express = require("express");

const {
  signUp,
  signIn,
  signOut
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/sign-up")
  .post(signUp);

router.route("/sign-in")
  .get(signIn);

router.route("/sign-out")
  .get(verifyToken, signOut);

module.exports = router;