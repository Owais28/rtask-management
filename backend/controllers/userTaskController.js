const Task = require('../models/task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  const { _id } = req.user
  try {
    const tasks = await Task.findByAssignee([_id])
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, assignedUser } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedUser
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, assignedUser } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, assignedUser },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};


// apis for users
// users can access their tasks only

// apis for admin
// Admin can
// - view all tasks
// - update them
// 