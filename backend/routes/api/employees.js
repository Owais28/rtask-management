const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);


router.route('/:id/delete')
    .put()

router.route('/:id/update')
    .put()

router.route('/')
// app.use('/tasks/:taskId')         // get a specific task

// app.use('/tasks/:taskId/edit')    // update a task
// app.use('/tasks/:taskId/delete')  // delete a task
// app.use('/admin/dashboard')
module.exports = router;