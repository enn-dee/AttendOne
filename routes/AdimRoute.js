import express from "express";
import { login, logout } from "../controllers/adminController.js";
const route = express.Router();

route.get("/login", login);
route.get("/logout", logout);

export default route;
