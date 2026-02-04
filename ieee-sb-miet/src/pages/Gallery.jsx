import React, { useEffect, useState } from 'react';
import siteData from '../utils/siteData';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS } from '../config/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState({});
  const [gallery, setgallery] = useState([])
  useEffect(() => {
    const fetchGallery = async () => {
        try {
          const response = await fetch(API_ENDPOINTS.GALLERY);
          if (!response.ok) {
            throw new Error('Failed to fetch gallery');
          }
          const data = await response.json();
          //console.log(data)
          const formattedData = data.map(item => ({
            ...item,
            image: item.image.map(img => img.startsWith('http') ? img : `${process.env.REACT_APP_API_URL}${item.image}`)
          }));
          //console.log(formattedData)
          setgallery(formattedData);
          setCurrentImage(
            formattedData.reduce((acc, event) => {
              acc[event._id] = 0;
              return acc;
            }, {})
          );
        } catch (error) {
          console.log('Error fetching gallery:', error);
        }
      };
      fetchGallery();
  }, [])
  
  return (
    <>
    <Navbar/>
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Event Gallery</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery?.map((item, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(item.image?.[currentImage[item._id] || 0])}
            >
              <img
                 key={currentImage[item._id]}
                 src={item.image?.[currentImage[item._id] || 0]}
                 alt={item.title}
                className="w-full h-64 object-cover rounded-lg transition-transform 
                         duration-300 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 
                            transition-opacity duration-300 rounded-lg flex items-end justify-between">
              {item.image?.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(prev => ({
                        ...prev,
                        [item._id]: (prev[item._id] - 1 + item.image.length) % item.image.length
                      }));
                    }}
                    className=" bg-black/90 text-white p-2 rounded-full shadow-md hover:bg-black/70 hover:scale-110 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0 flex justify-center items-center"
                    aria-label="Previous Image"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-white" />
                  </button>
                )}
                <p className="text-white p-2 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300">
                  {item.title}
                </p>
                {item.image?.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(prev => ({
                        ...prev,
                        [item._id]: (prev[item._id] + 1) % item.image.length
                      }));
                    }}
                    className=" bg-black/90 text-white p-2 rounded-full shadow-md hover:bg-black/70 hover:scale-110 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0"
                    aria-label="Next Image"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-white" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center 
                     justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <img
                src={selectedImage}
                alt={'image'}
                className="w-full h-auto"
              />
              <p className="text-white text-center mt-4">{selectedImage.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Gallery; 