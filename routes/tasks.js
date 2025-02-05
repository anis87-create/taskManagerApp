const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');
const errorsValidation = require('../validators/errorValidators');
router.post('/', errorsValidation, taskCtrl.createTask);
router.get('/',taskCtrl.getAllTasks);
router.get('/:id', taskCtrl.getTask);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);

module.exports = router;