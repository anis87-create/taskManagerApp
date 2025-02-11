const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');
const errorsTasksValidation = require('../middlewares/errorTasksValidators');
const isAuth = require('../middlewares/isAuth');
router.post('/',isAuth, errorsTasksValidation, taskCtrl.createTask);
router.get('/',isAuth, taskCtrl.getAllTasks);
router.get('/:id',isAuth, taskCtrl.getTask);
router.put('/:id',isAuth, errorsTasksValidation, taskCtrl.updateTask);
router.delete('/:id',isAuth, taskCtrl.deleteTask);

module.exports = router;