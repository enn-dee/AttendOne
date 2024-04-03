import mongoose from 'mongoose';
import User from './User.model.js';
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'], 
    required: true
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
