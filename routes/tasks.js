const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');
const errorsTasksValidation = require('../middlewares/errorTasksValidators');
router.post('/', errorsTasksValidation, taskCtrl.createTask);
router.get('/',taskCtrl.getAllTasks);
router.get('/:id', taskCtrl.getTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;