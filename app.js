const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

// Setup the MongoDB configs
const PORT = process.env.PORT || 8080;
const DB_NAME = process.env.DB_NAME || "TODO-DB";
const MONGODB_URL = "mongodb://127.0.0.1:27017/" + DB_NAME;

// Create the express app
const app = express();

// external Middlewares setup
app.use(bodyParser.json());

// To allow CORS policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,Access-Control-Allow-Credentials"
  );
  next();
});

// 'Todo' Routes
app.use("/todo", todoRoutes);
// 'Auth' Routes
app.use("/auth", authRoutes);

// FallBack Routes
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
