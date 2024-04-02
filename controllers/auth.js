import User from "../models/User.model.js";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { GenSetToken } from "../utils/Gen&SetCookie.js";
config();

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

    GenSetToken(tokenPayload, res);

    return res.status(201).json({
      success: `User created successfully `,
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
      const isPassword = await bcrypt.compare(user.password);
      if (isPassword) {
        const tokenPayload = { id: user._id, email: user.email };
        GenSetToken(tokenPayload, res);
        return res.status(200).json({ error: "Logged In" });
      }
      return res.status(501).json({ error: "Not valid cookie" });
    } else {
      return res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(501).json({ error: "Internal server error" });
  }
};
