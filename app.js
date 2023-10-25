const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { body, validationResult } = require("express-validator");

// Import Models
const Todo = require("./models/toDo");
const User = require("./models/user");

// Import routes
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");

// Setup the MongoDB configs
const PORT = 8080;
const DB_NAME = "TODO-DB";
const MONGODB_URL = "mongodb://127.0.0.1:27017/" + DB_NAME;

// Create the express app
const app = express();

// external Middlewares setup
app.use(bodyParser.json());
app.use(cors());

// Middleware for Routes for 'todo'
app.use("/todo", todoRoutes);

// Middleware for Routes for 'user'
app.use("/user", userRoutes);

app.use("/", (req, res, next) => {
  console.log("Root path reached!");
  res.status(200).json({
    message: "Hello from root path '/'",
  });
});

// Connect to mongodb and start the server listening
mongoose
  .connect(MONGODB_URL)
  .then((res) => {
    console.log(
      `App connected to the mongodb successfully to Database: ${DB_NAME}`
    );
    app.listen(PORT, () => {
      console.log(`Node Express server started on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error occurred while connecting to Mongodb! : ${err}`);
  });
