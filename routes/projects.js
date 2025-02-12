const express = require('express');
const router = express.Router();
const projectCtrl = require ('../controllers/projects');
const errorProjectsValidation = require('../middlewares/errorProjectsValidators');
const upload = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
const checkAccessRoles = require('../middlewares/accessRole');
const checkProjectOwnerShip = require('../middlewares/checkProjectOwnership');
router.get('/',isAuth,checkAccessRoles(["admin"]), projectCtrl.getAllProjeccts);
router.get('/:id',isAuth, projectCtrl.getOneProject);
router.post('/',isAuth, upload.single('avatar'), errorProjectsValidation,  projectCtrl.createProject);
router.put('/:id',isAuth, upload.single('avatar'),errorProjectsValidation, projectCtrl.updateProject);
router.delete('/:id',isAuth,checkProjectOwnerShip, projectCtrl.deleteProject);

module.exports = router;