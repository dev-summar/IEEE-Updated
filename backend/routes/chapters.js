const router = require('express').Router();
const Chapter = require('../models/Chapter');
const auth = require('../middleware/auth');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');

// Get all chapters
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new chapter (protected)
router.post('/', 
  auth, 
  upload.image.single('logo'),
  uploadToCloudinary('chapters'),
  async (req, res) => {
    try {
      const chapter = new Chapter({
        ...req.body,
        logo: req.cloudinaryUrl
      });
      await chapter.save();
      res.status(201).json(chapter);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Update chapter (protected)
router.put('/:id',
  auth,
  upload.image.single('logo'),
  uploadToCloudinary('chapters'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.cloudinaryUrl) {
        updateData.logo = req.cloudinaryUrl;
      }
      const chapter = await Chapter.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      res.json(chapter);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete chapter (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (chapter.logo) {
      const publicId = chapter.logo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chapter deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;