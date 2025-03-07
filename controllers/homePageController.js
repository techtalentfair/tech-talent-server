import HomePage from "../models/homePage.model.js";

// @desc Get Home Page data
// @route GET /api/home
export const getHomePage = async (req, res) => {
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
export const updateHomePage = async (req, res) => {
  try {
    const updatedHomePage = await HomePage.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedHomePage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
