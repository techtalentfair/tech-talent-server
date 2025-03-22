const {
  createSubscriber,
  getAllSubscribers,
  deleteSubscriberById,
  getSubscriberById,
} = require("../controllers/subscriberModel");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

const router = express.Router();

router.route("/")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), getAllSubscribers)
  .post(createSubscriber);

router.route("/:id")
  .get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), getSubscriberById)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteSubscriberById);

module.exports = router;
