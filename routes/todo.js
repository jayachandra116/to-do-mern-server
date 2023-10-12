const express = require("express");
const { body, validationResult } = require("express-validator");
const todoRouter = express.Router();

// import controllers
const todoController = require("../controllers/todo");

// Create a new todo item
// POST '/todo/new' 
todoRouter.post(
  "/new",
  [body("title").trim().not().isEmpty().withMessage(`Todo tile is invalid`)],
  todoController.createTodo
);

module.exports = todoRouter;
