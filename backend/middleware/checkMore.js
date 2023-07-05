import { findTasksByStatus } from "../controllers/adminTasksController"
const { findTasksByAssignee, findTasksByDueDate, findTasksByStatus } = require('../controllers/adminTasksController')

const checkMore = () => {
  const { query } = req

  if (query.status) return findTasksByStatus
  if (query.assignee) return findTasksByAssignee
  if (query.dueDate) return findTasksByDueDate
}

module.exports = checkMore