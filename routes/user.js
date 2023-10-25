const express = require("express");
const { body, param } = require("express-validator");
const userRouter = express.Router();

const User = require("../models/user");

const userController = require("../controllers/user");

// create a new user
// POST '/user/new'
userRouter.post(
  "/new",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("User firstName cant be empty")
      .isLength({ min: 3 })
      .withMessage("Length of first name is less than 3")
      .escape(),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("User lastName cant be empty")
      .isLength({ min: 3 })
      .withMessage("Length of last name is less than 3")
      .escape(),
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email cant be empty")
      .isEmail()
      .withMessage("Invalid email address")
      .custom(async (value) => {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error("E-mail already in use");
        }
      })
      .escape(),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password cant be empty")
      .isStrongPassword({
        minLength: 5,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
      .withMessage(
        "Password not strong. Min Length:5, Min lower-cases:1, Min upper-cases:1, Min numbers:1, Min symbols:1"
      )
      .escape(),
    body("confirmPassword")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Confirm Password cant be empty")
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Password and Confirm password are not same")
      .escape(),
  ],
  userController.createUser
);

// Get user details
// GET 'user/fetch/:id'
userRouter.get("/fetch/:id", userController.getUser);

// Update user details
// PUT 'user/update/:id'
userRouter.put("/update/:id", userController.updateUser);

// Delete a user
// DELETE 'user/:id'
userRouter.delete("/delete/:id", userController.deleteUser);

// Reset password for a user
// PUT 'user/reset-pwd/:id'
userRouter.put(
  "/reset-pwd/:id",
  [
    body("newPassword")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password cant be empty")
      .isStrongPassword({
        minLength: 5,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
      .withMessage(
        "Password not strong. Min Length:5, Min lower-cases:1, Min upper-cases:1, Min numbers:1, Min symbols:1"
      )
      .escape(),
  ],
  userController.resetPassword
);

module.exports = userRouter;
