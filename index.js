const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const mongoose = require("mongoose");

const {
  STATUS
} = require("./utils/appError");
const routes = require("./routes/versions");

dotenv.config({ path: `${__dirname}/.env` });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use("/api/v1/auth", routes.v1.authRoutes);
app.use("/api/v1/public", routes.v1.publicRoutes);
app.use("/api/v1/files", routes.v1.fileRoutes);
app.use("/api/v1/events", routes.v1.eventRoutes);
app.use("/api/v1/public", routes.v1.publicRoutes);
app.use("/api/v1/projects", routes.v1.projectRoutes);
app.use("/api/v1/subscribers", routes.v1.subscriberRoutes);
app.use("/api/v1/emails", routes.v1.emailRoutes);
app.use("/api/v1/register", routes.v1.registerRoutes);

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

