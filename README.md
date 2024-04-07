# Attendance Management System

Welcome to the Attendance Management System! This system helps in managing attendance records for students across different semesters. The system allows students to view their attendance records and administrators to manage attendance for all students.

## Features

- **User authentication:** Supports user authentication with JWT tokens.
- **Student dashboard:** Students can view their attendance records for each semester.
- **Admin panel:** Administrators can manage attendance records for all students.
- **Semester-wise attendance:** Supports filtering attendance records by semester.

## Technologies Used

- **Node.js:** Backend server runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing attendance records.
- **Mongoose:** MongoDB object modeling tool.
- **JWT (JSON Web Tokens):** For user authentication and authorization.
- **Postman:** For testing API endpoints.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. **Clone the repository:**
 ```bash
 git clone https://github.com/enn-dee/AttendOne.git
 ```
2. **cd AttendOne**
3. **npm install**
4. **Set up environment variables:**
Create a .env file in the root directory and add the following variables:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/attendance_db
JWT_SECRET=your_secret_key
```
5. **Start the server:**
```bash
npm start
```
## Usage
**Authentication:** Register as a student or login as an administrator to access the system.

**View Attendance:** Students can view their attendance records by semester.

**Manage Attendance:** Administrators can manage attendance records for all students.
### Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

