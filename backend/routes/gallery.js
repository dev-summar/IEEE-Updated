const router = require('express').Router();
const auth = require('../middleware/auth');
const Gallery = require('../models/Gallery');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort('-date');
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new gallery item (protected)
router.post('/',
  auth,
  upload.image.array('images',8),
  uploadToCloudinary('gallery'),
  async (req, res) => {
    try {
      if (!req.cloudinaryImages || req.cloudinaryImages.length === 0) {
        return res.status(400).json({ message: 'At least one event image is required' });
      }
      const galleryItem = new Gallery({
        ...req.body,
        image: req.cloudinaryImages.map(img => img.url)
      });
      await galleryItem.save();
      res.status(201).json(galleryItem);
    } catch (error) {
      if (req.cloudinaryImages && req.cloudinaryImages.length > 0) {
              try {
                for (const img of req.cloudinaryImages) {
                  await cloudinary.uploader.destroy(img.public_id);
                }
              } catch (cleanupError) {
                console.error('Error cleaning up uploaded images:', cleanupError);
              }
            }
      res.status(400).json({ message: error.message });
    }
  }
);

// Update gallery item (protected)
router.put('/:id',
  auth,
  upload.image.array('images',5),
  uploadToCloudinary('gallery'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      const gallery = await Gallery.findById(req.params.id)
      if (!gallery) {
        return res.status(404).json({ message: 'Gallery not found' });
      }
      if (req.cloudinaryImages && req.cloudinaryImages.length > 0) {
              if (gallery.image && gallery.image.length > 0) {
                for (const url of gallery.image) {
                  const publicId = url.split('/').pop().split('.')[0];
                  await cloudinary.uploader.destroy(publicId);
                }
              }
      
              updateData.image = req.cloudinaryImages.map(img => img.url);
            }
      const galleryItem = await Gallery.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      res.json(galleryItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete gallery item (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
     if (!gallery) {
          return res.status(404).json({ message: 'Gallery not found' });
        }
    
        if (gallery.image && gallery.image.length > 0) {
          for (const url of gallery.image) {
            const publicId = url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          }
        }
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;