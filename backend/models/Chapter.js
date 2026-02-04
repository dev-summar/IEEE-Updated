const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  focusAreas: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema); 