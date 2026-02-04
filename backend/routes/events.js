const router = require('express').Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort('-date');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event (protected route)
router.post(
  '/',
  auth,
  upload.image.array('images', 8),
  uploadToCloudinary('events'),
  async (req, res) => {
    try {
      const { title, date, time, location, description } = req.body;

      if (!title || !date || !time || !location || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      if (!req.cloudinaryImages || req.cloudinaryImages.length === 0) {
        return res.status(400).json({ message: 'At least one event image is required' });
      }

      const event = new Event({
        title: title.trim(),
        date: new Date(date),
        time,
        location: location.trim(),
        description: description.trim(),
        registrationLink: req.body.registrationLink || '',
        image: req.cloudinaryImages.map(img => img.url)
      });

      const savedEvent = await event.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      console.error('Event creation error:', error);

      if (req.cloudinaryImages && req.cloudinaryImages.length > 0) {
        try {
          for (const img of req.cloudinaryImages) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        } catch (cleanupError) {
          console.error('Error cleaning up uploaded images:', cleanupError);
        }
      }

      res.status(400).json({ message: error.message || 'Failed to save event' });
    }
  }
);


// Update event (protected)
router.put(
  '/:id',
  auth,
  upload.image.array('images', 5),
  uploadToCloudinary('events'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (req.cloudinaryImages && req.cloudinaryImages.length > 0) {
        if (event.image && event.image.length > 0) {
          for (const url of event.image) {
            const publicId = url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          }
        }

        updateData.image = req.cloudinaryImages.map(img => img.url);
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updatedEvent);
    } catch (error) {
      console.error('Update error:', error);
      res.status(400).json({ message: error.message });
    }
  }
);


// Delete event (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.image && event.image.length > 0) {
      for (const url of event.image) {
        const publicId = url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;