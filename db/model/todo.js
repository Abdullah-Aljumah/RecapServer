const mongoose = require("mongoose");

const todo = new mongoose.Schema({
  task: { type: String },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("todo", todo);
