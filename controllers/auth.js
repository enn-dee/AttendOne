import User from "../models/User.model.js";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { GenSetToken } from "../utils/Gen&SetCookie.js";
config();

export const signup = async (req, res) => {
  try {
    const { email, username, password, dob } = req.body;
    if (!email || !username || !password || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({ email, username, password: hashedPass, dob });
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
      const isPassword = await bcrypt.compare(password, user?.password);
      if (isPassword) {
        const tokenPayload = { id: user._id, email: user.email };

        GenSetToken(tokenPayload, res);

        return res.status(200).json({ success: "Logged In" });
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

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const checkUser = async (req, res, next) => {
//   try {
//     const { email, dob } = req.body;
//     if (!email || !dob) {
//       return res.status(401).json({ error: "Fields are required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: "User didn't found which such credientials" });
//     } else {
//       if (dob == user.dob) {
//         next();
//       }
//     }
//   } catch (err) {
//     console.log("Error in checkUser middleware", err.message);
//     return res.status(501).json({ error: "Internal server error" });
//   }
// };

export const forgot = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if all fields are provided
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the new password
    const hashedPass = await bcrypt.hash(password, 10);

    // Update user's password
    req.user.password = hashedPass;
    await req.user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error in forgot controller:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};