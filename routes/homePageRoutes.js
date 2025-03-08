const express = require("express");

const {
  getHomePage,
  updateHomePage,
} = require("../controllers/homePageController.js");
// import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getHomePage);
// router.put("/", verifyToken, updateHomePage);
router.put("/", updateHomePage);

module.exports = router;
