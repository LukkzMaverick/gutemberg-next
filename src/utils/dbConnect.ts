import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    throw error;
  });