import Attendance from "../models/Attendance.model.js";
import User from "../models/User.model.js";

export const getUsersBySemester = async (req, res) => {
  try {
    const { semester } = req.params;
    const users = await User.find({ semester: parseInt(semester) });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by semester:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const modifyAttendance = async (req, res) => {
  try {
    const { userId, semester, attendanceStatus } = req.body;
    const user = await User.findById(userId);
    // const currentDate = new Date().toISOString().split("T")[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updateFields = { status: attendanceStatus };
    await Attendance.findOneAndUpdate({ userId, semester }, updateFields, {
      upsert: true,
    });
    res.status(200).json({ success: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error modifying attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
