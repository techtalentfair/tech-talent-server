const controller = require("../../controllers/versions").v1.subscriberController;
const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const ROLES = require("../../utils/roles");

const router = express.Router();

router.route("/")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.getAllSubscribers)
  .post(controller.createSubscriber);

router.route("/:id")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.getSubscriberById)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.deleteSubscriberById);

module.exports = router;
