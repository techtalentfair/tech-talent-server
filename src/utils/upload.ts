import { Router } from "express";
import multer from "multer";
import cloudinary from "../middlewares/cloudinary"; 
import { UploadApiResponse } from "cloudinary";

const router = Router();


const upload1 = multer({ storage: multer.memoryStorage() });

const upload = async (fileBuffer: Buffer, fileType: string): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads", resource_type: fileType === "video" ? "video" : "image" }, 
        (error, result) => {
            if (error) {
            reject(error);
            } else {
            resolve(result as UploadApiResponse);
            }
        }
        );
        stream.end(fileBuffer);
    });
};


router.post(
    "/upload",
    upload1.single("file"), 
    async (req, res)=> {
        try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const type = req.file.mimetype;
        const file_Type = type.startsWith("video/") ? "video" : "image";

        
        const result = await upload(req.file.buffer, file_Type);

        res.json({ url: result.secure_url });
        } catch (error) {
        res.status(500).json({ error: "Upload failed", details: error });
        }
    }
);

export default router;
