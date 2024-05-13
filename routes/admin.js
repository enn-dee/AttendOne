// admin.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const Attendance = require('../models/attendance');
router.use(authMiddleware);
router.use(adminMiddleware);

router.post('/mark-attendance', async (req, res) => {
    try {
        const { userId, present } = req.body;
        const newAttendance = new Attendance({
            user: userId,
            present
        });

        await newAttendance.save();

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
