import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import mongoose from "mongoose";

import uploadRoutes from "./utils/upload";

dotenv.config({path: './.env'});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());

app.get('/', (req, res) => {
  res.status(200).send('TECHTALENT SERVER!');
});
app.use("/api", uploadRoutes);

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/techtalent').then(() => {
  
  console.log('Local Database Connected Successfully!');

  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch((err) => {
  console.log('DB ERROR!:', err);
});