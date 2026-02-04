const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  title: { type: String, required: false, default: null },
  department: { 
    type: String,
    required: function() {
      return this.section === 'ieeeSbTeam' || this.section === 'wieTeam';
    }
  },
  section: {
    type: String,
    required: true,
    enum: ['branchCounselor', 'facultyCoordinators', 'ieeeSbTeam', 'wieTeam']
  },
  linkedin: { type: String },
  image: { type: String, required: true } // Cloudinary image URL
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
