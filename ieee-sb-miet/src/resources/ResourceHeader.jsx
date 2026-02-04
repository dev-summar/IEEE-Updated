import React from 'react';
import { motion } from 'framer-motion';

const IEEEHeader = () => {
  const getResponsivePositions = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return [
        { id: 'ieee_students.png', x: -110, y: -250, duration: 1.5, color: '#ff6b6b' }, 
        { id: 'ieee_village.png', x: 120, y: 170, duration: 1.7, color: '#4ecdc4' }, 
        { id: 'ieee_human.png', x: 110, y: -250, duration: 1.6, color: '#45b7d1' }, 
        { id: 'ieee_tv.png', x: -110, y: 200, duration: 1.8, color: '#96c93d' },       
        { id: 'ieee_sight.png', x: 20, y: 230, duration: 1.4, color: '#f7d794' },
        { id: 'ieee_young.png', x: 0, y: -220, duration: 1.9, color: '#ff9f43' },  
      ];
    } else {
      return [
        { id: 'ieee_students.png', x: -550, y: -50, duration: 1.5, color: '#ff6b6b' },
        { id: 'ieee_village.png', x: 470, y: -70, duration: 1.7, color: '#4ecdc4' },
        { id: 'ieee_human.png', x: -480, y: 170, duration: 1.6, color: '#45b7d1' },
        { id: 'ieee_tv.png', x: 450, y: 200, duration: 1.8, color: '#96c93d' },
        { id: 'ieee_sight.png', x: -550, y: -260, duration: 1.4, color: '#f7d794' },
        { id: 'ieee_young.png', x: 380, y: -290, duration: 1.9, color: '#ff9f43' },
      ];
    }
  };

  const icons = getResponsivePositions();

  const iconVariant = {
    hidden: { x: 0, y: 0, opacity: 0 },
    visible: (i) => ({
      x: icons[i].x,
      y: icons[i].y,
      opacity: 1,
      transition: {
        duration: icons[i].duration,
        ease: 'easeOut',
      },
    }),
    float: (i) => ({
      y: [icons[i].y - 10, icons[i].y + 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2 + Math.random(), 
          ease: 'easeInOut',
        },
      },
    }),
  };
  const trailVariant = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: [0.3, 0.1, 0],
      x: icons[i].x,
      y: icons[i].y,
      transition: {
        duration: icons[i].duration,
        ease: 'easeOut',
        times: [0, 0.5, 1],
      },
    }),
  };
  const textVariant = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1.2,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/images/ieee_res_bg.jpg')" }}
      className="min-h-screen bg-center bg-cover p-4 md:p-8 overflow-hidden relative flex items-center justify-center"
    >
      <motion.section
        className="relative z-10 text-center"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={textVariant}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-montserrat mb-4"
          style={{
            textShadow:
              '0 4px 8px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          IEEE
        </motion.h1>

        <motion.h2
          variants={textVariant}
          className="text-2xl sm:text-3xl md:text-4xl text-white font-roboto font-medium"
          style={{
            textShadow:
              '0 4px 8px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          Resources
        </motion.h2>

        {/* Icons with trail and sine wave motion */}
        {icons.map((icon, index) => (
          <React.Fragment key={icon.id}>
            {/* Trail */}
            <motion.div
              className="absolute w-24 h-24 md:w-40 md:h-40 bg-gray-200/30 rounded-full"
              style={{ top: '0%', left: '0%' }}
              variants={trailVariant}
              custom={index}
              initial="hidden"
              animate="visible"
            />
            {/* Icon */}
            <motion.div
              className="absolute w-24 h-24 md:w-40 md:h-40 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-300"
              style={{ top: '0%', left: '0%',filter: `drop-shadow(0 4px 8px ${icon.color}80) drop-shadow(0 6px 20px ${icon.color}4D)`, }}
              variants={iconVariant}
              custom={index}
              initial="hidden"
              animate={['visible', 'float']}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={`/assets/images/${icon.id}`}
                alt={`Resource ${icon.id}`}
                className="w-24 h-24 md:w-40 md:h-40 object-cover"
              />
            </motion.div>
          </React.Fragment>
        ))}
      </motion.section>
    </div>
  );
};

export default IEEEHeader;