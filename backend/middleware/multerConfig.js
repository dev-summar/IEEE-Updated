const multer = require('multer');

// Storage configuration for uploading images
const storage = multer.memoryStorage();

// Configure file size limits
const limits = {
  image: {
    fileSize: 10 * 1024 * 1024 // 10MB for images
  },
  document: {
    fileSize: 10 * 1024 * 1024 // 10MB for documents
  }
};

// Create multer instances with specific configurations
const image = multer({
  storage,
  limits: {
    fileSize: limits.image.fileSize
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Export the multer configurations
module.exports = {
  image,
  limits
};