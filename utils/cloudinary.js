const { Router } = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");

const router = Router();
const upload1 = multer({ storage: multer.memoryStorage() });

const upload = (fileBuffer, fileType) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "uploads", resource_type: fileType === "video" ? "video" : "image" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(fileBuffer);
    });
};

module.exports =  upload ;