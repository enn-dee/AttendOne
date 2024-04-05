
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const studentController = require("../controllers/studentController.js");

// Route to get attendance records for a specific semester
router.get(
  "/attendance",
  authMiddleware,
  studentController.getAttendanceBySemester
);

// Route to get students by semester
router.get(
  "/students",
  authMiddleware,
  studentController.getStudentsBySemester
);

module.exports = router;

// router.get('/attendance', async (req, res) => {
//     try {
//         const userId = req.user.userId; // Get user ID from token payload

//         // Find attendance entries for the user
//         const userAttendance = await Attendance.find({ user: userId }).sort({ date: -1 });

//         res.status(200).json(userAttendance);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;
