import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
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
  isPresent: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

export default User;
