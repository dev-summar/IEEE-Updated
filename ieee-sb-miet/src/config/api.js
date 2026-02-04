// API base URL - backend mounts all routes under /api prefix
// Fallback for local dev when .env not configured
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/admin/login`,
  VERIFY_TOKEN: `${BASE_URL}/admin/verify`,
  ACHIEVEMENTS: `${BASE_URL}/achievements`,
  ACHIEVEMENT: (id) => `${BASE_URL}/achievements/${id}`,
  EVENTS: `${BASE_URL}/events`,
  EVENT: (id) => `${BASE_URL}/events/${id}`,
  EVENT_REGISTER: (id) => `${BASE_URL}/events/${id}/register`,
  GALLERY: `${BASE_URL}/gallery`,
  GALLERY_ITEM: (id) => `${BASE_URL}/gallery/${id}`,
  REPORTS: `${BASE_URL}/reports`,
  REPORTS_BY_TYPE: (type) => `${BASE_URL}/reports/type/${type}`,
  REPORT: (id) => `${BASE_URL}/reports/${id}`,
  REPORT_FILE: (filename) => `${BASE_URL}/reports/file/${filename}`,
  REPORT_FILE_BY_ID: (id) => `${BASE_URL}/reports/fileById/${id}`,
  STATS: `${BASE_URL}/stats`,
  CHAPTERS: `${BASE_URL}/chapters`,
  CHAPTER: (id) => `${BASE_URL}/chapters/${id}`,
  BANNERSADD: `${BASE_URL}/banner`,
  BANNERSDEL: (id) => `${BASE_URL}/banner/${id}`,
  BANNERSGET: `${BASE_URL}/banner`,
  TEAM: `${BASE_URL}/team`,
  TEAM_MEMBER: (id) => `${BASE_URL}/team/${id}`,
  TEAM_BY_SECTION: (section) => `${BASE_URL}/team?section=${section}`,
  STUDENTS: `${BASE_URL}/student`,
  STUDENTSDATA:`${BASE_URL}/student/getcsv`,
  HERO_SETTINGS: `${BASE_URL}/hero-settings`,
  UPDATES: `${BASE_URL}/updates`,
  UPDATES_ITEM: (id) => `${BASE_URL}/updates/${id}`,
};

export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`
});

export const handleImageUpload = async (file, endpoint) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: getAuthHeader(),
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.imageUrl; // This will be the Cloudinary URL
};

export const getCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;

  const [baseUrl, version, transformations, filename] = url.split('/upload/');
  const transforms = {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  };

  const transformString = Object.entries(transforms)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  return `${baseUrl}/upload/${transformString}/${filename}`;
};

export const checkRegistrationStatus = (event) => {
  if (!event.registrationLink) return 'coming_soon';
  if (new Date(event.date) < new Date()) return 'closed';
  return 'open';
};