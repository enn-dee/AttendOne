const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Attendance = require("../models/attendance");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
router.post("/signup", async (req, res) => {
  try {
    const { username, password, role, semester } = req.body;

    let existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      semester,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // const userAttendance = await Attendance.find({ user: user._id }).sort({
    //   date: -1,
    // });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/forgot", async (req, res) => {
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
});
module.exports = router;
