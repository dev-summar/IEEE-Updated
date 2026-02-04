const router = require('express').Router();
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Define HeroSettings schema if it doesn't exist yet
const HeroSettingsSchema = new mongoose.Schema({
  displayMode: {
    type: String,
    enum: ['video', 'carousel'],
    default: 'carousel'
  },
  videoUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dgipomlqg/video/upload/v1741114421/IEEE_YESIST_20250303_180504_0001_dcrljw.mp4'
  }
}, { timestamps: true });

// Check if the model is already registered
const HeroSettings = mongoose.models.HeroSettings || mongoose.model('HeroSettings', HeroSettingsSchema);

// Get hero settings
router.get('/', async (req, res) => {
  try {
    let settings = await HeroSettings.findOne();
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = new HeroSettings({
        displayMode: 'video',
        videoUrl: 'https://res.cloudinary.com/dgipomlqg/video/upload/v1741114421/IEEE_YESIST_20250303_180504_0001_dcrljw.mp4'
      });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error getting hero settings:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update hero settings
router.put('/', auth, async (req, res) => {
  try {
    const { displayMode, videoUrl } = req.body;
    
    let settings = await HeroSettings.findOne();
    
    if (!settings) {
      settings = new HeroSettings({
        displayMode: displayMode || 'video',
        videoUrl: videoUrl || 'https://res.cloudinary.com/dgipomlqg/video/upload/v1741114421/IEEE_YESIST_20250303_180504_0001_dcrljw.mp4'
      });
    } else {
      if (displayMode) settings.displayMode = displayMode;
      if (videoUrl) settings.videoUrl = videoUrl;
    }
    
    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Error updating hero settings:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;