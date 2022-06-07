const express = require("express");

const taskModel = require("../../db/model/todo");

// New task
const newTask = (req, res) => {
  const { task } = req.body;

  const newTask = new taskModel({ task: task });

  newTask.save().then((result) => {
    res.status(200).json(result);
  });
};

// Get all tasks
const getTasks = (req, res) => {
  try {
    taskModel.find({}).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete task
const deleteTask = (req, res) => {
  const { id } = req.params;
  try {
    taskModel.findByIdAndDelete({ _id: id }).then((result) => {
      if (result) {
        res.status(200).json({ Message: "Task deleted" });
      } else {
        res.status(404).json({ Message: "Task not found" });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Update task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  taskModel
    .findOneAndUpdate({ _id: id }, { $set: { task } }, { new: true })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ Message: "Task not found" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Complete task
const completeTask = (req, res) => {
  const { id } = req.params;
  taskModel.findOne({ _id: id }).then((result) => {
    if (result.completed == false) {
      taskModel
        .findOneAndUpdate(
          { _id: id },
          { $set: { completed: true } },
          { new: true }
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ Message: "Task not found" });
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } else {
      taskModel
        .findOneAndUpdate(
          { _id: id },
          { $set: { completed: false } },
          { new: true }
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ Message: "Task not found" });
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
  });
};

// Delete comleted task
const deleteComleted = (req, res) => {
  try {
    taskModel.deleteMany({ completed: true }).then((result) => {
      res.status(200).json({ Message: "Delted all completed" });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  newTask,
  getTasks,
  deleteTask,
  updateTask,
  completeTask,
  deleteComleted,
};
