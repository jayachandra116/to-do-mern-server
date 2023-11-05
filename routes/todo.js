const express = require("express");
const { body } = require("express-validator");
const todoRouter = express.Router();

// import controllers
const todoController = require("../controllers/todo");
const { isAuth } = require("../middlewares/auth");

// Create a new todo item
// POST '/todo/new'
todoRouter.post(
  "/new",
  isAuth,
  [body("title").trim().not().isEmpty().withMessage(`Todo tile is invalid`)],
  todoController.createTodo
);

// Update a new todo item
// POST '/todo/update/:id'
todoRouter.post(
  "/update/:id",
  isAuth,
  [
    body("title")
      .trim()
      .not()
      .isEmpty()
      .withMessage(`Todo tile is invalid`)
      .escape(),
    body("isCompleted")
      .trim()
      .not()
      .isEmpty()
      .withMessage(`Completion Status is invalid`)
      .escape(),
  ],
  todoController.updateToDo
);

// Fetch the user todos
todoRouter.get("/mine", isAuth, todoController.getUserTodos);

// Delete a todo item
todoRouter.delete("/delete/:id", isAuth, todoController.deleteTodo);

module.exports = todoRouter;
