const express = require('express');

const controller = require('../../controllers/versions').v1.eventController;
const upload = require('../../utils/multer');
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const ROLES = require("../../utils/roles");

const router = express.Router();


router.route('/')
  .get(controller.getEvents)
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.createEvent);

router.route('/:id')
  .get(controller.getEventById)
  .put(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.updateEventbyId)
  .delete(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.deleteEventById)
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), upload.single("file"), controller.addImageToEvent);

module.exports = router;
