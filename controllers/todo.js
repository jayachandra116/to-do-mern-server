const { validationResult } = require("express-validator");

// import Model
const Todo = require("../models/toDo");
const User = require("../models/user");

// create a new todo item
exports.createTodo = async (req, res, next) => {
  console.log("POST /todo/new reached!");
  // console.log(`Request body: ${req.body}`);
  // get any validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed!",
      errors: errors.array(),
      status: "error",
    });
  }
  // create the todo item and save it to the DB
  try {
    const todo = new Todo({
      title: req.body.title,
      creator: req.userId,
    });
    await todo.save();
    const user = await User.findById(req.userId);
    user.todos.push(todo._id);
    const savedUser = await user.save();
    res.status(201).json({
      message: "To-Do created!",
      status: "success",
      todo: {
        _id: todo._id,
      },
      creator: {
        _id: user._id,
        email: user.email,
      },
    });
    return savedUser;
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Internal server error",
      errors: err,
      status: "error",
    });
  }
};

exports.updateToDo = async (req, res, next) => {
  console.log("POST /todo/update/:id reached");
  // get any validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed!",
      errors: errors.array(),
      status: "error",
    });
  }
  const todoId = req.params.id;
  // create the todo item and save it to the DB
  try {
    const oldTodo = await Todo.findById(todoId).populate("creator");
    if (!oldTodo) {
      return res.status(400).json({
        message: "Todo not found",
        status: "error",
      });
    }
    if (oldTodo.creator._id.toString() !== req.userId) {
      // console.log(`todo creator id: ${oldTodo.creator._id}`);
      // console.log(`request user id: ${req.userId}`);
      return res.status(401).json({
        message: "Not Authorized!",
        status: "error",
      });
    }
    const updatedToDo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
    });
    if (!updatedToDo) {
      return res.status(400).json({
        message: "Todo not found",
        status: "error",
      });
    }
    res.status(200).json({
      message: "Todo Updated!",
      status: "success",
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
      errors: err,
    });
  }
};

exports.getUserTodos = async (req, res, next) => {
  console.log("GET /todo/mine reached");
  const userId = req.userId;
  try {
    const userToDos = await Todo.find({ creator: userId });
    if (!userToDos) {
      return res.status(400).json({
        message: "Todos not found",
        status: "error",
      });
    }
    res.status(200).json({
      message: "Todos fetched!",
      status: "success",
      todos: userToDos,
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Internal Server Error",
      errors: err,
      status: "error",
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  console.log("DELETE todo/delete/:id reached");
  const toDoId = req.params.id;
  try {
    const todo = await Todo.findByIdAndDelete(toDoId);
    if (!todo) {
      return res.status(400).json({
        message: "Todos not found",
        status: "error",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Deleted the todo!",
      id: todo._id,
    });
  } catch (err) {
    // server error occur
    res.status(500).json({
      message: "Internal Server Error",
      errors: err,
      status: "error",
    });
  }
};
