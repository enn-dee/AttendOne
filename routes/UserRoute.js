import express from "express";
import { forgot, login, logout, signup } from "../controllers/auth.js";
import { checkUser } from "../middleware/CheckUser.js";
import { getUsersBySemester } from "../controllers/getUsersBySemester.js";
import { modifyAttendance } from "../controllers/Attendance.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.post("/forgot", forgot);
// route.get("/forgot", checkUser, forgot);

route.get("/semester/:id", getUsersBySemester);
route.post("/mark", modifyAttendance);

export default route;
