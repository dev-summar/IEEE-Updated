import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const gradientOptions = [
  "linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 107, 107, 0.2) 100%)", // Red
  "linear-gradient(135deg, rgba(255, 215, 148, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 215, 148, 0.2) 100%)", // Yellow
  "linear-gradient(135deg, rgba(150, 201, 61, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(150, 201, 61, 0.2) 100%)", // Green
  "linear-gradient(135deg, rgba(69, 183, 209, 0.2) 0%, rgba(255, 255, 255, 1) 50%, rgba(69, 183, 209, 0.2) 100%)", // Blue
];

const ResourceCard = ({ resource, index }) => {
  const randomGradient = gradientOptions[index % gradientOptions.length];

  return (
    <motion.div
      className={cn(
        "rounded-lg p-6 shadow-md w-full max-w-sm mx-auto"
      )}
      style={{
        background: randomGradient,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <img
        src={resource.img}
        alt={resource.title}
        className="w-16 h-16 mx-auto mb-4 object-cover rounded-full"
      />
      <h3 className="text-black text-xl font-montserrat font-semibold text-center">
        {resource.title}
      </h3>
      <p className="text-gray-700 text-sm text-center mt-3">{resource.desc}</p>
     <motion.a
                 href={resource.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-black flex justify-center mt-4"
                 whileHover={{ scale: 1.2, color: "#4ecdc4" }}
               >
                 <motion.svg
                   className="w-7 h-7" 
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   whileHover={{
                     rotate: [0, 10, -10, 0],
                     transition: { duration: 0.5, ease: "easeInOut" },
                   }}
                 >
                   <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                   <polyline points="15 3 21 3 21 9" />
                   <line x1="10" y1="14" x2="21" y2="3" />
                 </motion.svg>
               </motion.a>
    </motion.div>
  );
};

export default ResourceCard;