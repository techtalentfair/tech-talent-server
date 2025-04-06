const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectsDetailsController');

router.get('/project/:id', projectController.getProjectDetail);
router.get('/', projectController.getProjects);
router.post('/project', projectController.createProject);
router.delete('/project/:id', projectController.deleteProject);
router.put('/project/:id', projectController.updateProject);

module.exports = router;
