const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

console.log("asaddsd");
router.post("/new/newUserRegister", registerUser);
router.post("/loginUser", loginUser);
router.post("/changePassword", authMiddleware, changePassword);

module.exports = router;
