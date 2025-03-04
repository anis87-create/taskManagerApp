const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/users');
const errosUserValidation = require('../middlewares/errorUsersValidation');
const upload = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
const checkAccessRoles = require('../middlewares/accessRole');
router.post('/', upload.single('avatar'), errosUserValidation, userCtrl.register);
router.post('/login', errosUserValidation, userCtrl.login);
router.get('/me',isAuth, userCtrl.currentUser);
router.get('/',isAuth,checkAccessRoles(["admin"]), userCtrl.findAll);
router.delete('/:id', isAuth, userCtrl.delete);
router.put('/:id', userCtrl.update);


module.exports = router;