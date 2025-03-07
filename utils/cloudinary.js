const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true
});

const uploadToCloudinary = async (fileBuffer, fileType) => {

  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      { folder: "uploads", resource_type: fileType === 'video' ? 'video' : 'image' },
      (error, result) => {
        if (error) reject("cloudinary error:", error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

module.exports = {
  uploadToCloudinary
};