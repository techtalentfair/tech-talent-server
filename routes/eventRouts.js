const express = require('express');


const eventController = require('../controllers/enentController');
const router = express.Router();


const upload = require('../utils/multer');

router.get('/getEvents', eventController.getEvents);

router.post('/createEvent', eventController.createEvent);

router.get('/getEvent/:id', eventController.getEventById);

router.put('/updateevent/:id', eventController.updateEventbyId);

router.delete('/deleteevents/:id', eventController.deleteEvent);

router.post('/addImage/:id',upload.single("file"), eventController.addImageToEvent);

module.exports = router;
