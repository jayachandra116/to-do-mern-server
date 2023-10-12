const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toDoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("ToDo", toDoSchema);

module.exports = todoModel;
