const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req, res, next) => {
  console.log("POST /auth/signup reached");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
      status: "error",
    });
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      todos: [], // create an empty todo array on first user creation
    });
    await user.save();
    if (!user) {
      return res.status(500).json({
        message: "Error occurred while creating user.",
        status: "error",
      });
    }
    res.status(201).json({
      status: "success",
      message: "User signed-up!",
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Internal Server Error",
      errors: err,
    });
  }
};

exports.login = async (req, res, next) => {
  console.log("POST /auth/login reached");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed!",
      status: "error",
      errors: errors.array(),
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect password or email", status: "error" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(401)
        .json({ message: "Incorrect password or email", status: "error" });
    }
    const token = jwt.sign(
      {
        subject: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Login Successful",
      status: "success",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id.toString(),
        token: token,
      },
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Internal Server Error",
      errors: err,
    });
  }
};
