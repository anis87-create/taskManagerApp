const express = require('express');
const router = express.Router();
const projectCtrl = require ('../controllers/projects');

router.get('/', projectCtrl.getAllProjeccts);
router.get('/:id', projectCtrl.getOneProject);
router.post('/', projectCtrl.createProject);
router.put('/:id', projectCtrl.updateProject);
router.delete('/:id', projectCtrl.deleteProject);

module.exports = router;