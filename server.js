import express from "express";
import AttendanceRoute from "./routes/AttendanceRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/connectToDb.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", AttendanceRoute);

app.listen(port, async () => {
  connectDB();
  console.log("Listening on port: ", port);
});
