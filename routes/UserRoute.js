import express from "express";
import { forgot, login, logout, signup } from "../controllers/auth.js";
import { checkUser } from "../middleware/CheckUser.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.get("/forgot", checkUser, forgot);

export default route;
