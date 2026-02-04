import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { API_ENDPOINTS, getAuthHeader } from '../../../config/api';

const GalleryForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];
  
    for (let file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('All files must be images');
        return;
      }
      validImages.push(file);
    }
  
    setImages(validImages);
    setPreviews(validImages.map(file => URL.createObjectURL(file)));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('date', formData.date);
      if (images.length > 0) {
        images.forEach((img, index) => {
          formDataToSend.append('images', img);
        });
      } else {
        throw new Error('At least one image is required');
      }

      const response = await fetch(API_ENDPOINTS.GALLERY, {
        method: 'POST',
        headers: {
          ...getAuthHeader()
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add gallery item');
      }

      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error adding gallery item:', error);
      setError(error.message || 'Failed to add gallery item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Add Gallery Item</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                required
                onChange={handleImageChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {images.length>0 && (
                <div className="mt-2 flex flex-wrap p-3 gap-2">
                  {images.map((preview,index)=>(
                    <div key={index} className='relative'>
                  <img
                    src={URL.createObjectURL(preview)}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImages(prev=>prev.filter(file=>file!=preview));
                      //URL.revokeObjectURL(preview);
                      //console.log(images)
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-600" />
                  </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="border-t p-4 bg-white">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    <span>Adding...</span>
                  </>
                ) : (
                  'Add Item'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryForm;
