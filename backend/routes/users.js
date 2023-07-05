var express = require('express');
const { updateUserById } = require('../controllers/userConroller');
var router = express.Router();

/* GET users listing. */
router.route("/:id").put(updateUserById)

module.exports = router;
