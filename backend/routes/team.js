const router = require('express').Router();
const auth = require('../middleware/auth');
const TeamMember = require('../models/TeamMember');
const upload = require('../middleware/multerConfig');
const uploadToCloudinary = require('../middleware/uploadToCloudinary');
const cloudinary = require('../config/cloudinary');

// Get all team members with optional section filter
router.get('/', async (req, res) => {
  try {
    const { section } = req.query;
    const query = section ? { section } : {};
    const members = await TeamMember.find(query).sort('createdAt');
    
    if (section) {
      res.json(members);
    } else {
      // Group members by section if no specific section is requested
      const organized = {
        branchCounselor: members.filter(m => m.section === 'branchCounselor'),
        facultyCoordinators: members.filter(m => m.section === 'facultyCoordinators'),
        ieeeSbTeam: members.filter(m => m.section === 'ieeeSbTeam'),
        wieTeam: members.filter(m => m.section === 'wieTeam')
      };
      res.json(organized);
    }
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update create route to include section
router.post('/',
  auth,
  upload.image.single('image'),
  uploadToCloudinary('team_members'),
  async (req, res) => {
    try {
      const { name, position, department, linkedin, section, title } = req.body;
      if (!name || !position || !section || !req.cloudinaryUrl) {
        return res.status(400).json({ 
          message: 'Name, position, section, and image are required' 
        });
      }
      const member = new TeamMember({
        name: name.trim(),
        position: position.trim(),
        title:title,
        department: department ? department.trim() : undefined,
        linkedin: linkedin ? linkedin.trim() : '',
        section,
        image: req.cloudinaryUrl
      });

      const savedMember = await member.save();
      res.status(201).json(savedMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Update team member details (protected route)
router.put('/:id',
  auth,
  upload.image.single('image'),
  uploadToCloudinary('team_members'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.cloudinaryUrl) {
        updateData.image = req.cloudinaryUrl;
      }
      const updatedMember = await TeamMember.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updatedMember);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Delete a team member (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    
    if (member.image) {
      const publicId = member.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
