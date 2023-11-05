const express = require("express");
const { body, param } = require("express-validator");
const userRouter = express.Router();

const User = require("../models/user");

const userController = require("../controllers/user");

// Get user details
// GET 'user/fetch/:id'
userRouter.get("/fetch/:id", userController.getUser);

// Update user details
// PUT 'user/update/:id'
userRouter.put("/update/:id", userController.updateUser);

// Delete a user
// DELETE 'user/:id'
userRouter.delete("/delete/:id", userController.deleteUser);

module.exports = userRouter;
