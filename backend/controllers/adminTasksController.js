const Task = require('../models/task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
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
  const { title, description, dueDate, assignedUsers } = req.body;
  // console.log(title)
  try {
    const task = await Task.create({
      title,
      description,
      // dueDate,
      assignedUsers
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

exports.moreHandler = async (req, res) => {
  const { query } = req
  try {
    if (query.status) return await this.findTasksByStatus()
    if (query.dueDate) return await this.findTasksByDueDate()
    if (query.assignee) return await this.findTasksByAssignee()

  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks." })
  }
}
// Find by assignee
exports.findTasksByAssignee = async () => {
  const { assignedUsers } = req.body
  try {
    const tasks = await Task.findByAssignee(assignedUsers);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
}

// Find by status
exports.findTasksByStatus = async () => {
  const { status } = req.body
  try {
    const tasks = await Task.findByStatus(status);
    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
}

// Find by Due Date
exports.findTasksByDueDate = async () => {
  const { dueDate } = req.body
  try {
    const tasks = await Task.findByDueDate(new Date(dueDate));
    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
}


// apis for users
// users can access their tasks only

// apis for admin
// Admin can
// - view all tasks
// - update them
// 