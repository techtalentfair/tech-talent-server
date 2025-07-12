const express = require("express");

const controller = require("../../controllers/versions").v1.emailController;
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const ROLES = require("../../utils/roles");

const router = express.Router();


router.route("/")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.getEmails)
  .post(controller.createEmail);

router.route("/:id")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.getEmailById)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.deleteEmailById);

module.exports = router;