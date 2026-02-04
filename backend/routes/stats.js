const router = require('express').Router();
const Event = require('../models/Event');
const Gallery = require('../models/Gallery');
const Achievement = require('../models/Achievement');
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// Get dashboard statistics (protected)
router.get('/', auth, async (req, res) => {
  try {
    const [events, gallery, achievements, reports] = await Promise.all([
      Event.countDocuments(),
      Gallery.countDocuments(),
      Achievement.countDocuments(),
      Report.countDocuments()
    ]);

    res.json({
      events,
      gallery,
      achievements,
      reports
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 