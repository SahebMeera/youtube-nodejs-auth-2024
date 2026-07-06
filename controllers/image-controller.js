const Image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");

const uploadImage = async (req, res) => {
  try {
    // check if file is missing in req object
    if (!req.file) {
      return res.status(404).json({
        success: false,
        message: "File is required. PLease upload the image",
      });
    }

    console.log(req.file);
    // updated the images
    const { url, publicId } = await uploadToCloudinary(req.file);
    console.log("asdasdasd====>");
    // store the image url and publicId on db mongoDB

    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again!",
    });
  }
};

module.exports = { uploadImage };
