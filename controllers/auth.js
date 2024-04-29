import User from "../models/User.model.js";
import bcrypt from "bcrypt";

import { config } from "dotenv";
import { GenSetToken } from "../utils/Gen&SetCookie.js";
config();

export const signup = async (req, res) => {
  try {
    const { email, username, password, dob, rollNumber, semester } = req.body;
    if (!email || !username || !password || !dob || !rollNumber || !semester) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPass,
      dob,
      semester,
      rollNumber,
    });
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

export const forgot = async (req, res) => {
  try {
    const { username, dob, password } = req.body;

    const user = await User.findOne({ username });

    if (user && user.dob.toISOString().split("T")[0] === dob) {
      await User.updateOne({ username }, { password: password });

      res.send("Password updated successfully!");
    } else {
      res.status(400).send("Invalid username or date of birth");
    }
  } catch (err) {
    console.error("Error in forgot controller:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
  // try {
  //   const { password, confirmPassword } = req.body;

  //   if (password !== confirmPassword) {
  //     return res.status(400).json({ error: "Passwords don't match" });
  //   }

  //   if (!password || !confirmPassword ) {
  //     return res.status(400).json({ error: "All fields are required" });
  //   }

  //   const hashedPass = await bcrypt.hash(password, 10);

  //   req.user.password = hashedPass;
  //   await req.user.save();

  //   return res.status(200).json({ message: "Password updated successfully" });
  // } catch (err) {
  //   console.error("Error in forgot controller:", err.message);
  //   return res.status(500).json({ error: "Internal server error" });
  // }
};
