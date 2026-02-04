require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// ==> Essential Variable Checks
const requiredEnv = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const missingEnv = requiredEnv.filter(v => !process.env[v]);

if (missingEnv.length > 0) {
  console.error(`FATAL ERROR: Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}
// <== Essential Variable Checks

const app = express();

// CORS - allow frontend origin for local dev and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow in dev; tighten for production
    }
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes - all mounted under /api
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/chapters', require('./routes/chapters'));
app.use('/api/banner', require('./routes/banners'));
app.use('/api/team', require('./routes/team'));
app.use('/api/student', require('./routes/student'));
app.use('/api/hero-settings', require('./routes/heroSettings'));
app.use('/api/updates', require('./routes/updates'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('IEEE SB MIET Backend is running');
});

const PORT = process.env.PORT || 5000;
let server;

// ==> Connect to DB and then start server
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('FATAL ERROR: MongoDB Connection Failed');
    console.error(`Error Message: ${err.message}`);
    process.exit(1);
  });
// <== Connect to DB and then start server

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
