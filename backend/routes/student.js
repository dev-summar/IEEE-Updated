const router = require('express').Router();
const auth = require('../middleware/auth');
const Student = require('../models/Student');

router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort('-date');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', 
  async (req, res) => {
    try {
      const student = new Student({
        ...req.body,
      });
      await student.save();
      res.status(201).json({message: 'Student saved successfully'});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
router.delete('/:id', async (req, res) => {
    try {
      // Support both MongoDB _id and custom id field
      const student = await Student.findOne({
        $or: [{ _id: req.params.id }, { id: req.params.id }]
      });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      await Student.findByIdAndDelete(student._id);
      res.json({ message: 'Student deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/getcsv', async(req,res)=>{   // CSV export for student data (optional backup to frontend export)
    try {
        const { Parser } = require('json2csv');
        const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        const students = await Student.find().sort('-createdAt');
        if(!students || students.length === 0){
            return res.status(404).json({message:"No Students found"});
        }
        const data = students.map(record => ({
            Name: record.name,
            StudentID: record.id,
            Branch: record.branch,
            Date: record.createdAt
        }));
        const parser = new Parser({ fields: ['Name', 'StudentID', 'Branch', 'Date'] });
        const csv = parser.parse(data);
        const header = `New Members\n\n`;
        const finalcsv = header + csv;
        res.header('Content-Type', 'text/csv');
        res.attachment(`${formattedDate}.csv`);
        res.send(finalcsv);
    } catch (error) {
        console.error('getcsv error:', error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;