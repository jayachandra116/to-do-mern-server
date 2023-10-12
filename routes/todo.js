const express = require("express");
const { body, param } = require("express-validator");
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

// Route to fetch the todo item by it's id (_id)
// GET 'todo/:id'
todoRouter.get("/all", todoController.fetchAllTodo);

// Route to fetch the todo item by it's id (_id)
// GET 'todo/:id'
todoRouter.get(
  "/:id",
  [param("id").trim().notEmpty().withMessage("Todo id is not available")],
  todoController.fetchTodoById
);

// Route to update a todo item by it's id (_id)
// PUT 'todo/:id'
todoRouter.put(
  "/:id",
  [
    body("title").trim().notEmpty().withMessage("Empty title"),
    body("isCompleted")
      .trim()
      .isIn(["true", "false"])
      .withMessage(
        "Accepted values for 'isCompleted' are only 'true' or 'false'."
      ),
  ],
  todoController.updateToDo
);

// Route to delete a todo item by it's id (_id)
// DELETE 'todo/:id'
todoRouter.delete(
  "/:id",
  [param("id").trim().notEmpty().withMessage("Id of the todo is empty")],
  todoController.deleteToDo
);

module.exports = todoRouter;
