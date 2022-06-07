const express = require("express");
const taskRouter = express.Router();

const {
  newTask,
  getTasks,
  deleteTask,
  updateTask,
  completeTask,
  deleteComleted,
} = require("../controllers/task");

taskRouter.post("/newTask", newTask);
taskRouter.get("/getTasks", getTasks);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.delete("/deleteCompletedTask", deleteComleted);
taskRouter.put("/updateTask/:id", updateTask);
taskRouter.put("/completeTask/:id", completeTask);

module.exports = taskRouter;
