import jwt from "jsonwebtoken";
export const adminToken = async (user, res) => {
  const token = jwt.sign(user, process.env.JSON_KEY, { expiresIn: "2d" });
  res.cookie("admin", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
