import express from "express";
import {
  getHomePage,
  updateHomePage,
} from "../controllers/homePageController.js";
// import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getHomePage);
// router.put("/", verifyToken, updateHomePage);
router.put("/", updateHomePage);

export default router;
