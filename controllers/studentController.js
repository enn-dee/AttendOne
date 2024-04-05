const User = require("../models/user");
const Attendance = require("../models/attendance");

const getStudentsBySemester = async (req, res) => {
  try {
    const { semester } = req.query;
    const students = await User.find({
      role: "student",
      semester: semester,
    }).select("_id username date");

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAttendanceBySemester = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("UserId: ", userId);
    const userAttendance = await Attendance.find({ user: userId })
      .sort({
        date: -1,
      })
      .select({ date: 1, present: 1, _id: 0 });

    res.status(200).json(userAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAttendanceBySemester, getStudentsBySemester };
