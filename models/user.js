const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  rollNumber: {
    type: String,
    unique: true,
  },
  semester: {
    type: Number,
  },
  isPresent: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "student",
  },
});

module.exports = mongoose.model("User", userSchema);
