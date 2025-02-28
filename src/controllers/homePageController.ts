


import { Request, Response } from "express";
import HomePage from "../models/homePage.model";

// @desc Get Home Page data
// @route GET /api/home
export const getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
        const homePage = await HomePage.findOne();
        if (!homePage) {
            res.status(404).json({ message: "Home Page not found" });
            return;
        }
        res.json(homePage);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Update Home Page data
// @route PUT /api/home
export const updateHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedHomePage = await HomePage.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedHomePage);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
