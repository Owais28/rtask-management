const express = require('express')
const router = express.Router()
const taskController = require('../../controllers/adminTasksController')

// base route
// /tasks/
router.route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask)

// /tasks/:id 
router.route('/:id')
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask)

// tasks/:id/more?
router.route("/:id/more")
  .get(taskController.moreHandler)


module.exports = router