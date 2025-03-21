const express = require("express");

const {
  uploadFile
} = require("../controllers/fileController")
const upload = require("../utils/multer");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const ROLES = require("../utils/roles");

const router = express.Router();

router.route('/upload')
  .post(verifyToken, allowedTo(ROLES.ADMIN, ROLES.SUPER_ADMIN), upload.single("file"), uploadFile);

module.exports = router;