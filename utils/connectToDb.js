import mongoose from "mongoose";
import { config } from 'dotenv';
config();

const url = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    const dbName = "AttendanceManagement";
    await mongoose.connect(`${url}${dbName}`);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};
