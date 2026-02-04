const router = require('express').Router();
const auth = require('../middleware/auth');
const Banners = require('../models/Banners');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');
router.get('/', async (req, res) => {
    try {
      const banners = await Banners.find();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Add new gallery item (protected)
router.post('/',
    auth,
    upload.image.single('image'),
    uploadToCloudinary('banners'),
    async (req, res) => {
      try {
        const bans = await Banners.find();
        if (bans.length >= 4) {
          return res.status(400).json({ message: 'Cannot add more than 4 banners' });
        }
        const banners = new Banners({
          ...req.body,
          image: req.cloudinaryUrl
        });
        await banners.save();
        res.status(201).json({message:'Banner Added'});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  );
  
  // Delete gallery item (protected)
  router.delete('/:id', auth, async (req, res) => {
    try {
      const banners = await Banners.findById(req.params.id);
      if (banners.image) {
        const publicId = banners.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      await Banners.findByIdAndDelete(req.params.id);
      res.json({ message: 'Gallery item deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
