import { Request, Response } from "express";
import { AboutPageModel } from "../models/aboutPage.model";

// Get About Page Data
export const getAboutPage = async (req: Request, res: Response) => {
  try {
    const aboutPage = await AboutPageModel.findOne();
    res.json(aboutPage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update About Page Data (Protected Route)
export const updateAboutPage = async (req: Request, res: Response) => {
  try {
    let aboutPage = await AboutPageModel.findOne();
    if (!aboutPage) {
      aboutPage = new AboutPageModel(req.body);
    } else {
      Object.assign(aboutPage, req.body);
    }
    await aboutPage.save();
    res.json({ message: "Updated successfully", data: aboutPage });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
