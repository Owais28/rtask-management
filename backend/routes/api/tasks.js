const express = require('express')
const userTaskController = require('../../controllers/userTaskController')
const router = express.Router()


router.get('/', userTaskController.getAllTasks)

router.get('/:id', userTaskController.getTaskById)

router.post('/', userTaskController.createTask)

router.put('/:id', userTaskController.updateTask)

router.delete('/:id', userTaskController.deleteTask)

module.exports = router