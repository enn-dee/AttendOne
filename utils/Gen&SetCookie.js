import jwt from "jsonwebtoken";
export const GenSetToken = (user, res) => {
  const key = process.env.JSON_KEY;
  const token = jwt.sign(user, key, { expiresIn: "2d" });
  
  res.cookie("jwt", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
