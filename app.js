const express = require("express");
const mongoose = require("mongoose");

const PORT = 8080;
const DB_NAME = "TODO-DB";
const MONGODB_URL = "mongodb://127.0.0.1:27017/" + DB_NAME;

const app = express();

app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello from root path '/'",
  });
});

mongoose
  .connect(MONGODB_URL)
  .then((res) => {
    console.log(`App connected to the mongodb successfully to Database: ${DB_NAME}`);
    app.listen(PORT, () => {
      console.log(`Node Express server started on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error occurred while connecting to Mongodb! : ${err}`);
  });
