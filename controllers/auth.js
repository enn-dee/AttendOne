import User from "../models/User.model.js";
import bcrypt from "bcrypt";

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

    return res.status(201).json({
      success: `User created successfully `,
    });
  } catch (error) {
    console.error("Error in signup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  
};
