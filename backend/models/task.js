const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    default: Date.now()
  },
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'done'],
    default: 'todo'
  }
});

// Static method to find tasks based on assignees
TaskSchema.statics.findByAssignee = function (assigneeIds) {
  return this.find({ assignees: { $in: assigneeIds } }).exec();
};


// Static method to find tasks based on status
TaskSchema.statics.findByStatus = function (status) {
  return this.find({ status: status }).exec();
};


// Static method to find tasks based on due date
TaskSchema.statics.findByDueDate = function (dueDate) {
  return this.find({ dueDate: dueDate }).exec();
};

// Instance method to check if the user is assigned to the task
TaskSchema.methods.isUserAssigned = function (userId) {
  return this.assignedUsers.some(user => user.toString() === userId.toString());
};

// Instance method to update the task if the user is assigned
TaskSchema.methods.updateTask = async function (title, description, dueDate, status, userId) {
  if (!this.isUserAssigned(userId)) {
    throw new Error('You are not authorized to update this task.');
  }

  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.status = status;

  return this.save();
};

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
