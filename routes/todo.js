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
todoRouter.get(
  "/all",
  todoController.fetchAllTodo
);

// Route to fetch the todo item by it's id (_id)
// GET 'todo/:id'
todoRouter.get(
  "/:id",
  [param("id").trim().not().isEmpty().withMessage("Todo id is not available")],
  todoController.fetchTodoById
);



module.exports = todoRouter;
