const express = require('express');
const router = express.Router();
const projectCtrl = require ('../controllers/projects');
const errorProjectsValidation = require('../middlewares/errorProjectsValidators');
const upload = require('../middlewares/multer');
router.get('/', projectCtrl.getAllProjeccts);
router.get('/:id', projectCtrl.getOneProject);
router.post('/',upload.single('avatar'), errorProjectsValidation,  projectCtrl.createProject);
router.put('/:id',upload.single('avatar'),errorProjectsValidation, projectCtrl.updateProject);
router.delete('/:id', projectCtrl.deleteProject);

module.exports = router;