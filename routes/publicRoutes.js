const express = require("express");

const {
  getAboutPage,
  updateAboutPage,
  getHomePage,
  updateHomePage
} = require("../controllers/publicController");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

const router = express.Router();

router.route('/home')
  .get(getHomePage)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateHomePage);

router.route('/about')
  .get(getAboutPage)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateAboutPage);

module.exports = router;