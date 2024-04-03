import User from "../models/User.model.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email, dob } = req.body;

    // Check if email and dob are provided
    if (!email || !dob) {
      return res.status(400).json({ error: "Email and DOB are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if DOB matches
    if (dob !== user.dob) {
      return res.status(401).json({ error: "Incorrect DOB" });
    }

    // Attach user data to request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error in checkUser middleware:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
