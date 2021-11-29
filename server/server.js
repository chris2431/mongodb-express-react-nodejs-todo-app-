import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import main from "./dbConnection/mongodb.js";
import router from "./routes/routes.js";
import passport from "passport";
import "./config/passport.js";

const PORT = process.env.PORT || 3001;

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
// Starts listening on port once connected to database

main(() => {
  app.use(router);
  app.listen(PORT);
});
