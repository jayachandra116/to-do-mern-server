const { body, validationResult } = require("express-validator");

// import Model
const Todo = require("../models/toDo");

exports.createTodo = async (req, res, next) => {
  console.log("POST /todo reached");
  console.log(`Request body: ${req.body}`);
  // get any validation errors from the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed for the to-do item.");
    return res.status(422).json({
      message: "Error occurred",
      errors: errors.array(),
    });
  }
  // create the todo item and save it to the DB
  try {
    const todo = new Todo({
      title: req.body.title,
    });
    await todo.save();
    res.status(201).send({
      message: "Created the To-do successfully",
      todo: {
        id: todo._id,
      },
    });
  } catch (error) {
    // server error occur
    res.status(500).json({
      message: "Error occurred while creating todo item",
      errors: error,
    });
  }
};
