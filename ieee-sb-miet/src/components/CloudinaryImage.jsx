import React, { useState } from 'react';

const CloudinaryImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Properly format Cloudinary URL
  const getOptimizedUrl = (url) => {
    if (!url?.includes('cloudinary.com')) return url;
    
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    
    return `${parts[0]}/upload/q_auto,f_auto/${parts[1]}`;
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
      <img
        src={getOptimizedUrl(src)}
        alt={alt}
        className={`${className} ${error ? 'hidden' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
          console.error('Failed to load image:', src);
        }}
      />
    </div>
  );
};

export default CloudinaryImage;