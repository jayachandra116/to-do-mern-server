const express = require("express");
const { body } = require("express-validator");

const authRouter = express.Router();

const User = require("../models/user");

const authController = require("../controllers/auth");

// Create a new user
authRouter.put(
  "/signup",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("User firstName cant be empty")
      .isLength({ min: 3 })
      .withMessage("Length of first name cant be less than 3")
      .escape(),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("User lastName cant be empty")
      .isLength({ min: 3 })
      .withMessage("Length of last name cant be less than 3")
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
          throw new Error("E-mail already in use!");
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
  ],
  authController.signUp
);

authRouter.post(
  "/login",
  [
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email cant be empty")
      .isEmail()
      .withMessage("Invalid email address")
      .escape(),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password cant be empty")
      .escape(),
  ],
  authController.login
);

module.exports = authRouter;
