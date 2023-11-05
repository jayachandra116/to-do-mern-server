const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Todo = require("../models/toDo");

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
    const user = await User.findById(userId).populate("todos"); // populate the todos path on the user document
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
        todos: user.todos, // set todos in the response
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
    await Todo.deleteMany({ creator: updatedUser._id }); // delete all the todo related to the current user when the user is deleted
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
