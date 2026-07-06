const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied.Here No token provide please login to continue.",
    });
  }
  try {
    console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decodedTokenInfo", decodedTokenInfo);
    console.log("check Admin===>1232");
    req.userInfo = decodedTokenInfo;
    console.log(req.userInfo);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Access denied. check No token provide please login to continue.",
    });
  }
};

module.exports = authMiddleware;
