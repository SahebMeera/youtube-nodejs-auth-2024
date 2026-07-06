const express = require("express");
const { uploadImage } = require("../controllers/image-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");

const router = express.Router();

router.post(
  "/imageUpload/uploads",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage,
);

module.exports = router;
