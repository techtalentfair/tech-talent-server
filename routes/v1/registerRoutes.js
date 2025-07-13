const express = require('express');
const router = express.Router();
const controller = require('../../controllers/versions').v1.registerController;
const verifyToken = require("../../middlewares/verifyToken");
const allowedTo = require("../../middlewares/allowedTo");
const ROLES = require("../../utils/roles");

router.post('/', controller.processAttendant);

router.route('/:type').get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.getAttendantsByType);

router.route('/:type/:id').get(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), controller.getAttendantById);

module.exports = router;
