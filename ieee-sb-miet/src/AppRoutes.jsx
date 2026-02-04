// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Achievements from './pages/Achievements';
import Chapters from './pages/Chapters';
import Join from './pages/Join';
import WIE from './pages/WIE';

// Admin imports
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import AdminGallery from './pages/admin/Gallery';
import AdminAchievements from './pages/admin/Achievements';
import AdminReports from './pages/admin/Reports';
import AdminChapters from './pages/admin/Chapters';
import Banner from './pages/admin/Banners';
import Team from './pages/admin/Team';
import Students from './pages/admin/Students';
import HeroSettings from './pages/admin/HeroSettings';
import Resources from './pages/Resources';
import Updates from './pages/admin/Updates';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/chapters" element={<Chapters />} />
      <Route path="/join" element={<Join />} />
      <Route path="/chapters/wie-miet" element={<WIE />} />
      <Route path="/resources" element={<Resources />} />
      {/* Admin routes */}
      <Route path="/admin">
        <Route path="login" element={<AdminLogin />} />
        
        {/* Protected admin routes */}
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="banners" element={<Banner/>} />
          <Route path="team" element={<Team />} />
          <Route path="students" element={<Students/>} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="chapters" element={<AdminChapters />} />
          <Route path="hero-settings" element={<HeroSettings />} />
          <Route path="updates" element={<Updates />} />
        </Route>
      </Route>
    </Routes>
  );
};

// Add default export
export default AppRoutes;