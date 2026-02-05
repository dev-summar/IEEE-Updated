import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, getServerOrigin } from "../config/api";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banner, setBanner] = useState([]);
  const [heroSettings, setHeroSettings] = useState({
    displayMode: 'video',
    videoUrl: '' // Remove hardcoded URL here
  });
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Fetch banners and hero settings simultaneously
    Promise.all([
      fetch(API_ENDPOINTS.BANNERSGET),
      fetch(API_ENDPOINTS.HERO_SETTINGS).catch(() => ({ 
        ok: false, // Change to false to prevent using fallback data
        json: () => Promise.reject(new Error('Failed to fetch hero settings'))
      }))
    ])
      .then(async ([bannerRes, settingsRes]) => {
        try {
          if (!bannerRes.ok) throw new Error('Failed to fetch banners');
          
          const bannerData = await bannerRes.json();
          let settingsData;
          
          try {
            if (settingsRes.ok) {
              settingsData = await settingsRes.json();
              console.log('Hero settings fetched:', settingsData);
            } else {
              throw new Error('Failed to fetch hero settings');
            }
          } catch (e) {
            console.warn('Error fetching hero settings:', e);
            // Try to fetch again directly
            try {
              const directSettingsRes = await fetch(API_ENDPOINTS.HERO_SETTINGS);
              if (directSettingsRes.ok) {
                settingsData = await directSettingsRes.json();
              } else {
                throw new Error('Failed to fetch hero settings directly');
              }
            } catch (directError) {
              console.error('Error fetching hero settings directly:', directError);
              // Only now use a fallback, but don't hardcode the URL
              settingsData = {
                displayMode: 'carousel',
                videoUrl: ''
              };
            }
          }
          
          // For relative paths: use server origin (without /api) + path. Cloudinary URLs are used as-is.
          const serverOrigin = getServerOrigin();
          const formattedBanners = bannerData.map(item => ({
            ...item,
            image: item.image && item.image.startsWith('http') ? item.image : `${serverOrigin}${item.image?.startsWith('/') ? '' : '/'}${item.image || ''}`
          }));
          
          setBanner(formattedBanners);
          setHeroSettings(settingsData);
        } catch (error) {
          console.error('Error processing hero data:', error);
        }
      })
      .catch(error => {
        console.error('Error fetching hero data:', error);
      });
  }, []);
  
  // Auto-advance carousel
  useEffect(() => {
    if (heroSettings.displayMode !== 'video' && banner.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banner.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [heroSettings.displayMode, banner]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // If no video URL is available, fall back to carousel mode
  const effectiveDisplayMode = 
    heroSettings.displayMode === 'video' && !heroSettings.videoUrl
      ? 'carousel'
      : heroSettings.displayMode;

  return (
    <section className="relative h-[80vh] md:h-screen mt-16">
      {effectiveDisplayMode === 'video' ? (
        // Video Hero
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0">
            {heroSettings.videoUrl ? (
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover object-center"
                key={heroSettings.videoUrl} // Add key to force video reload when URL changes
              >
                <source 
                  src={heroSettings.videoUrl} 
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full bg-blue-900 flex items-center justify-center">
                <p className="text-white text-lg">Video not available</p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          
          {/* Sound Control Button */}
          {heroSettings.videoUrl && (
            <button 
              onClick={toggleMute}
              className="absolute bottom-8 right-8 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300 z-10"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-5 h-5" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      ) : (
        // Image Carousel
        <div className="relative h-full overflow-hidden">
          {banner.length > 0 ? (
            banner.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="w-full h-full object-cover md:object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>
            ))
          ) : (
            // Fallback if no banners are available
            <div className="absolute w-full h-full bg-blue-900"></div>
          )}

          {/* Carousel Navigation Dots */}
          {banner.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banner.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hero Content - Appears over both video and carousel */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-2xl md:text-5xl font-bold mb-2">
            Welcome to IEEE SB MIET
          </h1>
          <p className="text-base md:text-xl mb-4">
            Fostering Innovation and Technical Excellence
          </p>
          <Link
            to={'/join'}
            className="bg-ieeeBlue hover:bg-blue-700 text-white px-4 py-2 rounded-full text-lg font-semibold transition duration-300"
          >
            Join Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
