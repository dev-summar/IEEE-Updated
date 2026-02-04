require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const username = process.argv[2] || 'admin';
const password = process.argv[3] || 'admin123';
const name = process.argv[4] || 'Admin';

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  const admin = new Admin({ username, password, name, role: 'super-admin' });
  await admin.save();
  console.log(`Admin created successfully: ${username}`);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
