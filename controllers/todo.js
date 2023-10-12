const { body, validationResult } = require("express-validator");

// import Model
const Todo = require("../models/toDo");

// create a new todo item
exports.createTodo = async (req, res, next) => {
  console.log("POST /todo reached");
  console.log(`Request body: ${req.body}`);
  // get any validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Error occurred. Validation failed for the to-do item.",
      errors: errors.array(),
    });
  }
  // create the todo item and save it to the DB
  try {
    const todo = new Todo({
      title: req.body.title,
    });
    await todo.save();
    res.status(201).json({
      message: "Created the To-do successfully",
      todo: {
        id: todo._id,
      },
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while creating todo item",
      errors: err,
    });
  }
};

// fetches all the to-dos in the db
exports.fetchAllTodo = async (req, res, next) => {
  console.log("GET /todo/all reached");
  try {
    const toDos = await Todo.find({});
    console.log(`Total number of to-dos found: ${toDos.length}`);
    res.status(200).json({
      message: "To-dos successfully fetched",
      todoItems: {
        total: toDos.length,
        items: [...toDos],
      },
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while fetching todo items",
      errors: err.message,
    });
  }
};

// fetch a todo item by it's id
exports.fetchTodoById = async (req, res, next) => {
  console.log("GET /todo/:id reached");
  console.log(`Request params: id:${req.params.id}`);
  // get any validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Error occurred. Validation failed for the to-do item.",
      errors: errors.array(),
    });
  }
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        message: `Todo with id: ${id} not found`,
      });
    }
    res.status(200).json({
      message: "Todo found successfully!",
      todo: todo,
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while fetching todo item",
      errors: err,
    });
  }
};


