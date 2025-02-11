const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/users');
const errosUserValidation = require('../middlewares/errorUsersValidation');
const upload = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
router.post('/', upload.single('avatar'), errosUserValidation, userCtrl.register);
router.post('/login', errosUserValidation, userCtrl.login);
router.get('/:id',isAuth, userCtrl.authMe);
router.get('/',isAuth, userCtrl.findAll);
router.delete('/:id',isAuth, userCtrl.delete);
router.put('/:id',errosUserValidation, userCtrl.update);


module.exports = router;