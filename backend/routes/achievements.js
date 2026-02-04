const router = require('express').Router();
const auth = require('../middleware/auth');
const Achievement = require('../models/Achievement');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort('-date');
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new achievement (protected)
router.post('/', 
  auth, 
  upload.image.single('image'),
  uploadToCloudinary('achievements'),
  async (req, res) => {
    try {
      const achievement = new Achievement({
        ...req.body,
        image: req.cloudinaryUrl
      });
      await achievement.save();
      res.status(201).json(achievement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Update achievement (protected)
router.put('/:id',
  auth,
  upload.image.single('image'),
  uploadToCloudinary('achievements'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.cloudinaryUrl) {
        updateData.image = req.cloudinaryUrl;
      }
      const achievement = await Achievement.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      res.json(achievement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete achievement (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (achievement.image) {
      const publicId = achievement.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;