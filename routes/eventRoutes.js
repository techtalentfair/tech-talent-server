const express = require('express');

const {
  addImageToEvent,
  deleteEventById,
  createEvent,
  getEventById,
  getEvents,
  updateEventbyId
} = require('../controllers/eventController');
const upload = require('../utils/multer');
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

const router = express.Router();


router.route('/')
  .get(getEvents)
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), createEvent);

router.route('/:id')
  .get(getEventById)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), updateEventbyId)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), deleteEventById)
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), upload.single("file"), addImageToEvent);

module.exports = router;
