
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    semester: {
        type: Number,
        min: 1,
        max: 8
    }
});

module.exports = mongoose.model('User', userSchema);
