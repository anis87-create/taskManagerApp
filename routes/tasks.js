const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');
const errorsTasksValidation = require('../middlewares/errorTasksValidators');
const isAuth = require('../middlewares/isAuth');
const checkTaskOwnerShip = require('../middlewares/checkTaskOwnerShip');
router.post('/',isAuth, errorsTasksValidation, taskCtrl.createTask);
router.get('/', taskCtrl.getAllTasks);
router.get('/:id',isAuth, taskCtrl.getTask);
router.put('/:id',isAuth, errorsTasksValidation,checkTaskOwnerShip, taskCtrl.updateTask);
router.delete('/:id',isAuth,checkTaskOwnerShip, taskCtrl.deleteTask);

module.exports = router;