const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();
router.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;

  res.json({
    message: "Welcome to the home page ",
    userInfo: {
      username: username,
      userId: userId,
      role: role,
    },
  });
});

module.exports = router;
