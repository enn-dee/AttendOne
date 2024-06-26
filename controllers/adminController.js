import { Admin } from "../models/Admin.model.js";
import { adminToken } from "../utils/AdminToken.js";

export const login = async (req, res) => {
  try {
    res.clearCookie("jwt");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const isAdmin = await Admin.findOne({ email });
    if (isAdmin) {
      adminToken({ email, password }, res);
      return res.status(200).json({ success: "Admin Logged In" });
    }
    return res.status(400).json({ error: "Invalid credentials" });
  } catch (err) {
    console.log("Error in admin login route ", err.message);
    return res.status(501).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("admin");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
