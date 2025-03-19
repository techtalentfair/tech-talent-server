const express = require('express');

const {
  addImageToEvent,
  deleteEventById,
  createEvent,
  getEventById,
  getEvents,
  updateEventbyId
} = require('../controllers/eventController');

const router = express.Router();


const upload = require('../utils/multer');

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .get(getEventById)
  .put(updateEventbyId)
  .delete(deleteEventById)
  .post(upload.single("file"), addImageToEvent);

module.exports = router;
