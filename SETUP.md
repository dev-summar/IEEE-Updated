# IEEE SB MIET - Local Setup Instructions

This document provides instructions to run the IEEE Chapter website project locally.

## Prerequisites

- **Node.js** 16.x or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **Cloudinary account** (for image uploads)

## Project Structure

```
IEEE-MIET-master/
├── backend/          # Express.js API server
├── ieee-sb-miet/     # React (Vite) frontend
└── SETUP.md          # This file
```

## 1. Backend Setup

### Install dependencies
```bash
cd backend
npm install
```

### Configure environment variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` with your values:
   - `MONGODB_URI` - Your MongoDB connection string (e.g., `mongodb://localhost:27017/ieee-miet` or Atlas URI)
   - `JWT_SECRET` - A random secret string for JWT tokens
   - `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
   - `CLOUDINARY_API_KEY` - From Cloudinary dashboard
   - `CLOUDINARY_API_SECRET` - From Cloudinary dashboard

### Create initial admin user (first run only)
Before logging in, you need an admin. Use MongoDB Compass or mongosh to run:
```javascript
// Or call POST /api/admin/setup with body: { username, password, name }
// The Admin model hashes the password automatically
```

Alternatively, create a one-time setup script or use the `/api/admin/setup` endpoint:
```bash
curl -X POST http://localhost:5000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword","name":"Admin"}'
```

### Start the backend
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Backend runs at **http://localhost:5000**. Test: `http://localhost:5000` should return "IEEE SB MIET Backend is running".

## 2. Frontend Setup

### Install dependencies
```bash
cd ieee-sb-miet
npm install
```

### Configure environment variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. For local development, the default `.env` should work:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Start the frontend
```bash
npm run dev
```

Frontend runs at **http://localhost:5173** (Vite default).

## 3. Running Both Services

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd ieee-sb-miet
npm run dev
```

Then open http://localhost:5173 in your browser.

## 4. API Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/login` | POST | Admin login |
| `/api/admin/verify` | GET | Verify JWT token |
| `/api/events` | GET | List events |
| `/api/achievements` | GET | List achievements |
| `/api/gallery` | GET | List gallery items |
| `/api/team` | GET | List team members |
| `/api/banner` | GET | List hero banners |
| `/api/updates` | GET | List updates |
| `/api/student` | POST | Join form submission |
| `/api/hero-settings` | GET | Hero display settings |
| `/api/reports` | GET | List reports |
| `/api/chapters` | GET | List chapters |
| `/api/stats` | GET | Dashboard stats (auth required) |

## 5. Troubleshooting

### Backend won't start
- **Missing env vars**: Ensure all required variables in `.env` are set
- **MongoDB connection failed**: Check MongoDB is running and URI is correct
- **Port 5000 in use**: Set `PORT=5001` in `.env` and update frontend `VITE_API_URL`

### Frontend API calls fail (404/CORS)
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` is `http://localhost:5000/api` (include `/api`)
- CORS is configured for localhost:5173 and localhost:3000

### Login fails
- Create an admin user via `/api/admin/setup` if none exists
- Check JWT_SECRET is set in backend `.env`

### Images not loading
- Cloudinary credentials must be valid in backend `.env`
- Banners/hero images from Cloudinary use full URLs; relative paths need server origin

## 6. Production Deployment

- **Backend**: Deploy to Railway, Render, Heroku, or VPS. Set env vars in platform.
- **Frontend**: Build with `npm run build`, deploy `dist/` to Vercel, Netlify, or static host.
- Set `VITE_API_URL` to your production API URL before building.
- Set `FRONTEND_URL` in backend for CORS in production.
