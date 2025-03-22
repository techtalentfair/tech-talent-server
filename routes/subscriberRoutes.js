const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");
const {
  addSubscriber,
  getAllSubscribers,
  deleteSubscriberById,
  getSubscriberById,
} = require("../controllers/subscriberModel");

const router = express.Router();

router
  .route("/subscriber")
  .get(
    verifyToken,
    allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    getAllSubscribers
  ).post(addSubscriber);
router
  .route("/subscriber/:id")
  .get(
    verifyToken,
    allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    getSubscriberById
  )
  .delete(
    verifyToken,
    allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),
    deleteSubscriberById
  );

module.exports = router;
