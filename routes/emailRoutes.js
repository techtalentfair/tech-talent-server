const express = require("express");

const {
  createEmail,
  deleteEmailById,
  getEmailById,
  getEmails
} = require("../controllers/emailController");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

const router = express.Router();


router.route("/")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), getEmails)
  .post(createEmail);

router.route("/:id")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), getEmailById)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteEmailById);

module.exports = router;