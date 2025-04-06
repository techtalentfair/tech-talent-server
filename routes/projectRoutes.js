const express = require('express');

const {
  createProject,
  deleteProjectById,
  getProjectById,
  getProjects,
  updateProjectById
} = require('../controllers/projectController');
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");


const router = express.Router();

router.route("/")
  .get(getProjects)
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createProject);

router.route("/:id")
  .get(getProjectById)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateProjectById)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteProjectById);

module.exports = router;
