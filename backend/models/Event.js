const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  image: [{ type: String, required: true }],
  description: { type: String, required: true },
  location: { type: String, required: true },
  registrationLink: String,
  status: { 
    type: String, 
    enum: ['upcoming', 'past'],
    default: function() {
      return this.date > new Date() ? 'upcoming' : 'past';
    }
  },
  report: { type: String }
}, { 
  timestamps: true 
});

// Add pre-save middleware to update status
eventSchema.pre('save', function(next) {
  this.status = this.date > new Date() ? 'upcoming' : 'past';
  next();
});

module.exports = mongoose.model('Event', eventSchema);