import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const main = async (callback) => {
  try {
    const URI = process.env.MONGO_URI;

    const connection = () => {
      mongoose.connect(URI);
    };

    await callback(connection());
    console.log(URI);
  } catch (err) {
    console.log(err);
  }
};

export default main;
