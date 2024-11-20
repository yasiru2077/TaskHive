const { Task } = require("../models");

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user.id, // Extracted from JWT
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Task creation failed", details: error.message });
  }
};

exports.getTasks = async (req, res) => {
  const { isCompleted } = req.query;

  try {
    const tasks = await Task.findAll({
      where: {
        userId: req.user.id,
        ...(isCompleted !== undefined && {
          isCompleted: isCompleted === "true",
        }),
      },
      order: [["dueDate", "ASC"]],
    });

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve tasks", details: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, isCompleted } = req.body;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.isCompleted =
      isCompleted !== undefined ? isCompleted : task.isCompleted;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update task", details: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete task", details: error.message });
  }
};
