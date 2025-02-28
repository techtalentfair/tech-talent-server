import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import mongoose from "mongoose";
import homePageRoutes from "./routes/homePageRoutes";
dotenv.config({ path: './.env' });



const app = express();

// Use the router for the /api/home path.
app.use("/api/home", homePageRoutes);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());

app.get('/', (req, res) => {
  res.status(200).send('TECHTALENT SERVER!');
});

mongoose.set("strictQuery", false);

mongoose.connect(process.env.LOCAL_DB!!).then(() => {
  
  console.log('Local Database Connected Successfully!');

  app.listen(process.env.PORT, () => {
    console.log('Server is Running!');
  });
}).catch((err) => {
  console.log('DB ERROR!:', err);
});