const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  console.log("POST /todo/new reached");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Error occurred. Validation failed for user creation",
      errors: errors.array(),
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    if (!user) {
      return res.status(500).json({
        message: "Error occurred while creating user , please try again later",
        errors: err,
      });
    }
    res.status(201).json({
      message: "Created the user successfully",
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while creating user",
      errors: err,
    });
  }
};

exports.getUser = async (req, res, next) => {
  console.log(`GET /todo/fetch reached!`);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({
  //     message: "Error occurred. Validation failed for user fetching",
  //     errors: errors.array(),
  //   });
  // }
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Fetched user successfully",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while fetching user",
      errors: err,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  console.log(`PUT /user/fetch reached!`);
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "No user found",
      });
    }
    return res.status(200).json({
      message: "Updated User successfully",
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while updating user",
      errors: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log(`DELETE /user/delete reached!`);
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndDelete(userId);
    if (!updatedUser) {
      return res.status(404).json({
        message: "No user found",
      });
    }
    return res.status(200).json({
      message: "Deleted User successfully",
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while updating user",
      errors: err,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  console.log(`PUT user/reset-pwd/:id reached!`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Error occurred. Validation failed for user creation",
      errors: errors.array(),
    });
  }
  const userId = req.params.id;
  try {
    const newHashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newHashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "No user found",
      });
    }
    return res.status(200).json({
      message: "Reset Password successful",
    });
  } catch (error) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while updating user",
      errors: err,
    });
  }
};
