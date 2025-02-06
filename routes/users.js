const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/users');
router.post('/', userCtrl.register);
router.get('/:id', userCtrl.findOne);
router.get('/', userCtrl.findAll);
router.delete('/:id', userCtrl.delete);
router.put('/:id', userCtrl.update);


module.exports = router;