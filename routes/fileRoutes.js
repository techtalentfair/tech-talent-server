const express = require("express");

const upload = require("../utils/multer");
const {
  uploadFile
} = require("../controllers/fileController")

const router = express.Router();

router.route('/upload')
  .post(upload.single("file"), uploadFile);

module.exports = router;