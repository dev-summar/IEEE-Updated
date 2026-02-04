const router = require('express').Router();
const auth = require('../middleware/auth');
const Update = require('../models/Updates');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');

// Get all update items
router.get('/', async (req, res) => {
  try {
    const updateItems = await Update.find();
    res.json(updateItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new update item (protected)
router.post('/',
  auth,
  upload.image.single('image'),
  uploadToCloudinary('updates'),
  async (req, res) => {
    try {
      if (!req.cloudinaryUrl) {
        return res.status(400).json({ message: 'An image is required' });
      }
      const updateItem = new Update({
        ...req.body,
        image: req.cloudinaryUrl
      });
      await updateItem.save();
      res.status(201).json(updateItem);
    } catch (error) {
      if (req.cloudinaryUrl) {
        try {
          await cloudinary.uploader.destroy(req.cloudinaryPublicId);
        } catch (cleanupError) {
          console.error('Error cleaning up uploaded image:', cleanupError);
        }
      }
      res.status(400).json({ message: error.message });
    }
  }
);

router.put('/:id',
  auth,
  upload.image.single('image'),
  uploadToCloudinary('updates'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      const update = await Update.findById(req.params.id);
      if (!update) {
        return res.status(404).json({ message: 'Update not found' });
      }
      if (req.cloudinaryUrl) {
        if (update.image) {
          const publicId = update.image.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        }
        updateData.image = req.cloudinaryUrl;
      }
      const updateItem = await Update.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      res.json(updateItem);
    } catch (error) {
      if (req.cloudinaryUrl) {
        try {
          await cloudinary.uploader.destroy(req.cloudinaryPublicId);
        } catch (cleanupError) {
          console.error('Error cleaning up uploaded image:', cleanupError);
        }
      }
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete update item (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    if (update.image) {
      const publicId = update.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Update.findByIdAndDelete(req.params.id);
    //console.log("fdel")
    res.json({ message: 'Update item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;