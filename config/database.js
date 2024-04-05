const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.mongoURI;
const connectDB = async () => {
  try {
    const dbName = "attendance_management";

  
    await mongoose.connect(`${mongoURI}${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    
    process.exit(1);
  }
};

module.exports = connectDB;
