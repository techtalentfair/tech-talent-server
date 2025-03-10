const express = require("express");
const {
  getAboutPage,
  updateAboutPage
} = require("../controllers/aboutPageController.js");
// import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAboutPage);
// router.put("/", verifyToken, updateHomePage);
router.put("/", updateAboutPage);

module.exports = router;
