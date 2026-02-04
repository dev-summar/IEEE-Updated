const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

// Initialize GridFS-related variables
let gfs;
let gridfsBucket;

// Connect to MongoDB once the connection is open
mongoose.connection.once('open', () => {
  // Initialize GridFS bucket
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'reports'
  });
  
  // Set up gridfs-stream for compatibility
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('reports');
});

/**
 * Helper functions for GridFS operations
 */
const gridFsHelpers = {
  // Store a file in GridFS
  storeFile: async (file, metadata = {}) => {
    if (!gridfsBucket) return null;
    
    return new Promise((resolve, reject) => {
      // Generate a unique filename
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString('hex') + path.extname(file.originalname);
        
        // Create a GridFS stream for writing
        const writeStream = gridfsBucket.openUploadStream(filename, {
          contentType: file.mimetype,
          metadata: {
            originalName: file.originalname,
            uploadDate: new Date(),
            ...metadata
          }
        });
        
        // Stream the buffer to GridFS
        writeStream.end(file.buffer);
        
        writeStream.on('finish', function() {
          resolve({
            id: writeStream.id,
            filename: filename,
            contentType: file.mimetype,
            size: file.size
          });
        });
        
        writeStream.on('error', reject);
      });
    });
  },
  
  // Find a file by its filename
  findFileByFilename: async (filename) => {
    if (!gridfsBucket) return null;
    
    const files = await mongoose.connection.db.collection('reports.files')
      .find({ filename: filename })
      .toArray();
      
    return files.length > 0 ? files[0] : null;
  },
  
  // Find a file by its ID
  findFileById: async (id) => {
    if (!gridfsBucket) return null;
    
    try {
      const fileId = new mongoose.Types.ObjectId(id);
      const files = await mongoose.connection.db.collection('reports.files')
        .find({ _id: fileId })
        .toArray();
        
      return files.length > 0 ? files[0] : null;
    } catch (error) {
      console.error('Invalid ObjectId:', error);
      return null;
    }
  },
  
  // Delete a file by its ID
  deleteFile: async (id) => {
    if (!gridfsBucket) return false;
    
    try {
      await gridfsBucket.delete(new mongoose.Types.ObjectId(id));
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  },
  
  // Create a read stream for a file
  createReadStream: (fileId) => {
    if (!gridfsBucket) return null;
    
    try {
      return gridfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    } catch (error) {
      console.error('Error creating read stream:', error);
      return null;
    }
  }
};

module.exports = { 
  getGridFsBucket: () => gridfsBucket,
  getGfs: () => gfs,
  gridFsHelpers
};
