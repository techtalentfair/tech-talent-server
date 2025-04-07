const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const mongoose = require("mongoose");

const {
  STATUS
} = require("./utils/appError");
const authRouter = require("./routes/authRoutes");
const fileRouter = require("./routes/fileRoutes");
const eventRouter = require("./routes/eventRoutes");
const publicRouter = require("./routes/publicRoutes");
const projectRouter = require("./routes/projectRoutes");
const subscriberRouter = require("./routes/subscriberRoutes");
const emailRouter = require("./routes/emailRoutes");

dotenv.config({ path: `${__dirname}/.env` });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use("/api/auth", authRouter);
app.use("/api/public", publicRouter);
app.use("/api/files", fileRouter);
app.use("/api/events", eventRouter);
app.use("/api/public", publicRouter);
app.use("/api/projects", projectRouter);
app.use("/api/subscribers", subscriberRouter);
app.use("/api/emails", emailRouter);

app.get("/", (req, res) => {
  res.status(200).send("TECHTALENT SERVER!");
});

app.use((error, req, res, next) => {

  res.status(error.statusCode || 500).json({
    status: error.statusText || STATUS.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.LOCAL_DB || "mongodb://localhost:27017/techtalent")
  .then(() => {
    console.log("Local Database Connected Successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.log("DB ERROR!:", err);
  });

