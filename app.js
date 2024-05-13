const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const cors = require("cors")

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
