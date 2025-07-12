const express = require('express');

const controller = require('../../controllers/versions').v1.projectController;
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const ROLES = require("../../utils/roles");


const router = express.Router();

router.route("/")
  .get(controller.getProjects)
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.createProject);

router.route("/:id")
  .get(controller.getProjectById)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.updateProjectById)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.deleteProjectById);

module.exports = router;
