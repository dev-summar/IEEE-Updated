import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, getAuthHeader } from '../../config/api';

const HeroSettings = () => {
  const [settings, setSettings] = useState({
    displayMode: 'video',
    videoUrl: 'https://res.cloudinary.com/dgipomlqg/video/upload/v1741114421/IEEE_YESIST_20250303_180504_0001_dcrljw.mp4'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Try to fetch existing settings
      const response = await axios.get(API_ENDPOINTS.HERO_SETTINGS);
      setSettings({
        displayMode: response.data.displayMode || 'video',
        videoUrl: response.data.videoUrl || 'https://res.cloudinary.com/dgipomlqg/video/upload/v1741114421/IEEE_YESIST_20250303_180504_0001_dcrljw.mp4'
      });
    } catch (error) {
      console.error('Error fetching hero settings:', error);
      // If settings don't exist, we'll create them on first save
      setError('Settings not found. Save to create new settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(API_ENDPOINTS.HERO_SETTINGS, settings, {
        headers: getAuthHeader()
      });

      setSettings({
        displayMode: response.data.displayMode,
        videoUrl: response.data.videoUrl
      });
      setSuccess('Settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Hero Section Settings</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Display Mode</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="displayMode"
                value="video"
                checked={settings.displayMode === 'video'}
                onChange={handleInputChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Video</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="displayMode"
                value="carousel"
                checked={settings.displayMode === 'carousel'}
                onChange={handleInputChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Image Carousel</span>
            </label>
          </div>
        </div>
        
        {settings.displayMode === 'video' && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={settings.videoUrl}
              onChange={handleInputChange}
              placeholder="Enter video URL (Cloudinary or YouTube)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {settings.videoUrl && (
              <div className="mt-4 border rounded-lg overflow-hidden h-40">
                <video
                  src={settings.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                >
                  Your browser does not support video preview.
                </video>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSettings;