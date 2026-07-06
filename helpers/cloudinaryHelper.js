const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = async (filePath) => {
  try {
    console.log("filePath", filePath);
    const result = await cloudinary.uploader.upload(filePath.path);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("WHile upload error getting from cloudary");
    throw new Error("Error while uploading to cloudinary");
  }
};

module.exports = {
  uploadToCloudinary,
};
