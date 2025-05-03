const express = require('express');
const router = express.Router();
const {
	processAttendant,
	getAttendantsByType,
	getAttendantById
} = require('../controllers/registerController');
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

router.post('/',processAttendant);

router.route('/:type').get(verifyToken,allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),getAttendantsByType);

router.route('/:type/:id').get(verifyToken,allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN),getAttendantById);

module.exports = router;
