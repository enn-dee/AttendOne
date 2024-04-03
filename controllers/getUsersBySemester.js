import User from "../models/User.model.js";

export const getUsersBySemester = async (req, res) => {
  try {
    const { id } = req.params;
    const semesterNumber = parseInt(id);

    const users = await User.find({ semester: semesterNumber }).select('username rollNumber');;
    console.log("getUsers");
    if(users.length<1){
        return res.status(200).json({message:"No students found"})
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by semester:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};