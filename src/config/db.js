import mongoose from "mongoose";
console.log(process.env.MONGODB_URI_LOCAL);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI_LOCAL);
    console.log("Database connect successfull 😎");
  } catch (error) {
    console.log(error.message, "Database connection failed ⚠");
  }
};

export default connectDB;
