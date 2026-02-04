import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { API_ENDPOINTS, getAuthHeader } from '../../config/api';
import GalleryForm from './components/GalleryForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import CloudinaryImage from '../../components/CloudinaryImage';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImage, setCurrentImage] = useState({});
  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GALLERY);
      if (!response.ok) {
        throw new Error('Failed to fetch gallery');
      }
      const data = await response.json();
      const formattedData = data.map(item => ({
        ...item,
        image: item.image.map(img => img.startsWith('http') ? img : `${process.env.REACT_APP_API_URL}${item.image}`)
      }));
      setGallery(formattedData);
      setCurrentImage(
        formattedData.reduce((acc, event) => {
          acc[event._id] = 0;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(API_ENDPOINTS.GALLERY_ITEM(id), {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      fetchGallery();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Image
        </button>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No images yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by adding your first image to the gallery
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div 
              key={item._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden group"
            >
              <div className="relative aspect-video">
                <CloudinaryImage
                  key={currentImage[item._id]}
                  src={item.image?.[currentImage[item._id] || 0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.image?.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('click')
                      setCurrentImage(prev => ({
                        ...prev,
                        [item._id]: (prev[item._id] - 1 + item.image.length) % item.image.length
                      }));
                    }}
                    className="absolute left-2 bottom-1 -translate-y-1/2 bg-black/90 text-white p-2 rounded-full shadow-md hover:bg-black/70 hover:scale-110 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0 flex justify-center items-center"
                    aria-label="Previous Image"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-white" />
                  </button>
                )}
                {item.image?.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(prev => ({
                        ...prev,
                        [item._id]: (prev[item._id] + 1) % item.image.length
                      }));
                    }}
                    className="absolute right-2 bottom-1 -translate-y-1/2 bg-black/90 text-white p-2 rounded-full shadow-md hover:bg-black/70 hover:scale-110 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0"
                    aria-label="Next Image"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-white" />
                  </button>
                )}
                <div className=" pointer-events-none absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDelete(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 pointer-events-auto"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery Form Modal */}
      {showForm && (
        <GalleryForm
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            setShowForm(false);
            fetchGallery();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <DeleteConfirmation
          title="Delete Gallery Item"
          message="Are you sure you want to delete this image? This action cannot be undone."
          onConfirm={async () => {
            await handleDelete(selectedItem._id);
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
};

export default Gallery;
