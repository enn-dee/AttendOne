// attendance.js

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    present: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
