const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/users');
const errosUserValidation = require('../middlewares/errorUsersValidation');
const upload = require('../middlewares/multer');
router.post('/',upload.single('avatar'), errosUserValidation, userCtrl.register);
router.post('/login', errosUserValidation, userCtrl.login);
router.get('/:id', userCtrl.authMe);
router.get('/', userCtrl.findAll);
router.delete('/:id', userCtrl.delete);
router.put('/:id',errosUserValidation, userCtrl.update);


module.exports = router;