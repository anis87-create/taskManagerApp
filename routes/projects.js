const express = require('express');
const router = express.Router();
const projectCtrl = require ('../controllers/projects');
const errorProjectsValidation = require('../middlewares/errorProjectsValidators');
const upload = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
router.get('/',isAuth, projectCtrl.getAllProjeccts);
router.get('/:id',isAuth, projectCtrl.getOneProject);
router.post('/',isAuth, upload.single('avatar'), errorProjectsValidation,  projectCtrl.createProject);
router.put('/:id',isAuth, upload.single('avatar'),errorProjectsValidation, projectCtrl.updateProject);
router.delete('/:id',isAuth, projectCtrl.deleteProject);

module.exports = router;