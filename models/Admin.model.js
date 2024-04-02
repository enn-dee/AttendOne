import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    unique: true,
    lowercase: true,
  },
});

export const Admin = mongoose.model("Admin", AdminSchema);

// const admin = new Admin({
//     email: "admin@gmail.com",
//     password: "admin@pass",
//   });
//   admin.save();
