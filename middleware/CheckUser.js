import User from "../models/User.model.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email, dob } = req.body;

    if (!email || !dob) {
      return res.status(400).json({ error: "Email and DOB are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (dob !== user.dob) {
      return res.status(401).json({ error: "Incorrect DOB" });
    }

    // Attach user data to request object
    req.user = user;

    next();
  } catch (err) {
    console.error("Error in checkUser middleware:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
