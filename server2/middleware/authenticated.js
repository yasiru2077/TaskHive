import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    console.log("great success");
    req.userId = userInfo.id;
    next();
  });
};
