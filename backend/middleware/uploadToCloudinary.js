const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const uploadToCloudinary = (folder) => async (req, res, next) => {
  const files = req.files || (req.file ? [req.file] : []);
  if (files.length === 0) return next();
  try {
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: folder },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
        const readable = Readable.from(buffer);
        readable.pipe(stream);
      });
    };

    const uploadedImages = [];

    for (const file of files) {
      const result = await streamUpload(file.buffer);
     // console.log(result)
      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }
    if (files.length === 1) {
      req.cloudinaryUrl = uploadedImages[0].url;
      req.cloudinaryPublicId = uploadedImages[0].public_id;
    }
    req.cloudinaryImages = uploadedImages;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images to Cloudinary', error });
  }
};

module.exports = uploadToCloudinary;