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
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("ToDo", toDoSchema);

module.exports = todoModel;
