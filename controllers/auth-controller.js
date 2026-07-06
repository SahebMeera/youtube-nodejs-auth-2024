// register controller
const AuthUser = require("../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (username !== undefined && username !== null) {
      const checkExistUser = await AuthUser.findOne({
        $or: [{ username }, { email }],
      });
      console.log(checkExistUser);
      if (checkExistUser) {
        res.status(400).json({
          success: true,
          message: "This User Information Already exist, Please check once",
          username: username,
        });
      } else {
        const salt = await bycrypt.genSaltSync(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const newlyCreatedUser = new AuthUser({
          username,
          email,
          password: hashedPassword,
          role: role,
        });
        await newlyCreatedUser.save();
        // const newUserRegister = await User.create(newlyCreatedUser);
        if (newlyCreatedUser) {
          res.status(201).json({
            success: true,
            message: "New User create successfully",
            data: newlyCreatedUser,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Something went wrong, Please check once",
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, Please check once",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUserExist = await AuthUser.findOne({ username });
    console.log(checkUserExist);
    if (!checkUserExist) {
      res.status(400).json({
        success: false,
        message: "Invalid username and password",
      });
    }
    const isPasswordMatch = await bycrypt.compare(
      password,
      checkUserExist.password,
    );
    console.log("isPasswordMatch", isPasswordMatch);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid username and password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: checkUserExist._id,
        username: checkUserExist.username,
        role: checkUserExist.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "45m" },
    );
    process.env.JWT_SECRET_KEY = accessToken;
    res.status(200).json({
      success: true,
      message: "User found successfully ",
      accessToken,
    });
    console.log("asasd");
  } catch (error) {}
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    console.log(userId);
    const { oldPassword, newPassword } = req.body;

    // find the currentlogin user
    const user = await AuthUser.findOne({ _id: userId });
    console.log("user====>", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    // check old password is correct
    const isPasswordMatch = await bycrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: true,
        message: "Old Password is not correct,  please try again ",
      });
    }

    // hash the new password
    const salt = await bycrypt.genSalt(10);
    const newHasedPassword = await bycrypt.hash(newPassword, salt);
    //update the new password
    user.password = newHasedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password change successfully",
    });
  } catch (error) {
    console.log("comes---->", error);
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Something wrong please check once ",
    });
  }
};

module.exports = { registerUser, loginUser, changePassword };
