import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
config();
const KEY = process.env.JSON_KEY;

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({ email, username, password: hashedPass });
    await newUser.save();

    const tokenPayload = { id: newUser._id, email: newUser.email }; 
    const token = jwt.sign(tokenPayload, KEY, { expiresIn: "1h" });

    return res.status(201).json({
      success: `User created successfully `,
      token: token,
    });
  } catch (error) {
    console.error("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      await bcrypt.compare(user.password);

      return res.status(200).json({ error: "Logged In" });
    } else {
      return res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(501).json({ error: "Internal server error" });
  }
};
