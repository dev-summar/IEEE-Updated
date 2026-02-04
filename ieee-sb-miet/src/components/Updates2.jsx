import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Updates2 = ({updates}) => {
  const imagedata = [
    //'/assets/updates/u1.jpg',
    //'/assets/updates/u2.jpg',
    //'/assets/updates/u3.jpg',
    //'/assets/updates/u4.jpg',
    //'/assets/updates/u5.jpg',
    //'/assets/updates/u6.jpg',
  ]
  const images = updates;
  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Event</h2>
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-3 md:p-6">
        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="swiper-container"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div  className="relative w-full h-[250px] sm:h-[400px] md:h-[400px] flex items-center justify-center border-white border-2 shadow-inner shadow-white">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 ease-in-out swiper-slide-active:scale-100 swiper-slide:scale-75 swiper-slide-active:blur-0 swiper-slide:blur-lg swiper-slide-active:brightness-100 swiper-slide:brightness-50"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>{`
        .swiper-container {
          padding-bottom: 40px;
        }
        .swiper-slide {
          transition: transform 0.5s ease, filter 0.5s ease;
          opacity: 0.7;
        }
        .swiper-slide-active {
          opacity: 1;
        }
        .swiper-pagination-bullet {
          background: #4b5563;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #1f2937;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #1f2937;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default Updates2;