const router = require('express').Router();
const auth = require('../middleware/auth');
const Report = require('../models/Report');
const mongoose = require('mongoose');
const upload = require('../middleware/gridfsMiddleware');
const { gridFsHelpers, getGridFsBucket } = require('../config/gridfs');

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('eventId').sort('-createdAt');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reports by type (annual/event)
router.get('/type/:type', async (req, res) => {
  try {
    const reports = await Report.find({ type: req.params.type })
      .populate('eventId')
      .sort('-createdAt');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload new report (protected)
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Store file in GridFS with metadata
    const metadata = {
      eventId: req.body.eventId || null,
      type: req.body.type || 'document',
      title: req.body.title || req.file.originalname
    };

    // Use our custom GridFS helper to store the file
    const storedFile = await gridFsHelpers.storeFile(req.file, metadata);
    
    if (!storedFile) {
      return res.status(500).json({ message: 'Failed to store file' });
    }

    // Create new report record with reference to the GridFS file
    const report = new Report({
      ...req.body,
      file: storedFile.id, // Store the GridFS file ID
      fileMetadata: {
        filename: storedFile.filename,
        originalName: req.file.originalname,
        contentType: req.file.mimetype,
        size: req.file.size
      }
    });
    
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete report (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Delete file from GridFS
    await gridFsHelpers.deleteFile(report.file);

    // Delete report document
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get file by filename
router.get('/file/:filename', async (req, res) => {
  try {
    // Find the file by filename
    const file = await gridFsHelpers.findFileByFilename(req.params.filename);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Set the appropriate content type
    res.set('Content-Type', file.contentType || file.metadata.contentType);
    res.set('Content-Disposition', `attachment; filename="${file.metadata.originalName}"`);

    // Create a readable stream
    const readstream = gridFsHelpers.createReadStream(file._id);
    if (!readstream) {
      return res.status(500).json({ message: 'Could not create file stream' });
    }
    
    // Handle stream errors
    readstream.on('error', (error) => {
      console.error('Stream error:', error);
      // Only send error if headers haven't been sent
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error streaming file' });
      }
    });
    
    // Pipe the file to the response
    readstream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get file by ID
router.get('/fileById/:id', async (req, res) => {
  try {
    // Find the file by ID
    const file = await gridFsHelpers.findFileById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Set the appropriate content type
    res.set('Content-Type', file.contentType || file.metadata.contentType);
    res.set('Content-Disposition', `attachment; filename="${file.metadata.originalName}"`);

    // Create a readable stream
    const readstream = gridFsHelpers.createReadStream(req.params.id);
    if (!readstream) {
      return res.status(500).json({ message: 'Could not create file stream' });
    }
    
    // Pipe the file to the response
    readstream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;