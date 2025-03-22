const express = require("express");

const {
  getAboutPage,
  updateAboutPage,
  getHomePage,
  updateHomePage,
  getContactUsEmails,
  getContactUsEmailById,
  createContactUsEmail,
  deleteContactUsEmailById,
} = require("../controllers/publicController");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

const router = express.Router();

router
  .route("/home")
  .get(getHomePage)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateHomePage);

router
  .route("/about")
  .get(getAboutPage)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateAboutPage);

router
  .route("/contact-us/emails")
  .get(
    verifyToken,
    allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    getContactUsEmails
  )
  .post(createContactUsEmail);
router
  .route("/contact-us/emails/:id")
  .get(
    verifyToken,
    allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    getContactUsEmailById
  )
  .delete(
    verifyToken,
    allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    deleteContactUsEmailById
  );
module.exports = router;
