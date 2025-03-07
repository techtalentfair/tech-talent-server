// aboutPage.routes.js
import express from "express";
import {
  getAboutPage,
  updateAboutPage,
} from "../controllers/aboutPageController.js";
// import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getAboutPage);
// router.post("/", verifyToken, updateAboutPage);
router.post("/", updateAboutPage);

export default router;
