const express = require("express");

const {
  getAboutPage,
  updateAboutPage,
  getHomePage,
  updateHomePage
} = require("../controllers/publicController");

const router = express.Router();

router.route('/home')
  .get(getHomePage)
  .put(updateHomePage);

router.route('/about')
  .get(getAboutPage)
  .put(updateAboutPage);

module.exports = router;