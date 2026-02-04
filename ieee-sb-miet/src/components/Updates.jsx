import { Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Updates = () => {
  // Slideshow properties for smooth transitions
  const images = [
    '/assets/updates/u1.jpg',
    '/assets/updates/u2.jpg',
    '/assets/updates/u3.jpg',
    '/assets/updates/u4.jpg',
    '/assets/updates/u5.jpg',
    '/assets/updates/u6.jpg',
  ]
  const properties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    pauseOnHover: true,
    
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4">
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 p-4">
        <Fade autoplay duration={2000} transitionDuration={1000} infinite indicators arrows pauseOnHover >
          {images.map((image, index) => (
            
              <img
              key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover sm:object-cover md:h-[600px] transition-transform duration-500 ease-in-out hover:scale-105"
              />
          
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default Updates;