const mongoose = require('mongoose');

const heroSettingsSchema = new mongoose.Schema({
  displayMode: {
    type: String,
    enum: ['video', 'carousel'],
    default: 'carousel'
  },
  videoUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dgipomlqg/video/upload/v1741114421/IEEE_YESIST_20250303_180504_0001_dcrljw.mp4'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensure there's only one settings document
heroSettingsSchema.pre('save', async function(next) {
  const count = await this.constructor.countDocuments();
  if (count > 0 && this.isNew) {
    next(new Error('Only one hero settings document allowed'));
  } else {
    this.lastUpdated = new Date();
    next();
  }
});

const HeroSettings = mongoose.model('HeroSettings', heroSettingsSchema);
module.exports = HeroSettings;