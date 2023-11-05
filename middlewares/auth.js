const User = require("../models/user");
const jwt = require("jsonwebtoken");

TOKEN_SECRET = "somesecretusedeinthecreationoftoken";

module.exports.isAuth = (req, res, next) => {
  console.log("Verify User reached!");
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated." });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated." });
  }
  // {
  //   subject: '6543a1d84d05e538b5adb277',
  //   email: 'test1@test.com',
  //   iat: 1698931348,
  //   exp: 1698934948
  // }
  if (decodedToken) {
    req.userId = decodedToken.subject;
  }
  next();
};
