import express from "express";
import { getAboutPage, updateAboutPage } from "../controllers/aboutPageController";
// import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", getAboutPage);
// router.post("/", verifyToken, updateAboutPage); 
router.post("/", updateAboutPage); 


export default router;
