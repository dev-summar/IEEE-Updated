const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['annual', 'event'], required: true },
  file: { type: mongoose.Schema.Types.ObjectId, required: true }, // GridFS file ID
  fileMetadata: {
    filename: String,
    originalName: String,
    contentType: String,
    size: Number
  },
  year: { type: Number },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);