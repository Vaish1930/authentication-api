import jwt from "jsonwebtoken";

const JWT_SECRET = "ZXCVBNMLKJHGFDDAQWERTYUIIOPVDSFSFGSFS";

export const generateToken = (userData) =>
  jwt.sign(
    {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    },
    JWT_SECRET
  );

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("authToken");
    if (!token) return res.status(401).json("Access denied");

    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json("Invalid token");
  }
};
