"use client";
import React from "react";
import { CardContainer, CardBody, CardItem } from "./3DCard"; // Adjust path
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

// Subtle pastel rainbow-inspired colors (hex codes)
const colorOptions = [
  "#FFD1D1", // Pastel red
  "#FFF3D1", // Pastel yellow
  "#D9E8C9", // Pastel green
  "#C9E8F2", // Pastel blue
  "#E8D1F2", // Pastel purple
];

// Enhanced shadow effects matching pastel rainbow theme
const shadowOptions = [
  "0 4px 12px rgba(255, 209, 209, 0.4), 0 8px 24px rgba(255, 209, 209, 0.25)", // Softer red shadow
  "0 4px 12px rgba(255, 243, 209, 0.4), 0 8px 24px rgba(255, 243, 209, 0.25)", // Softer yellow shadow
  "0 4px 12px rgba(217, 232, 201, 0.4), 0 8px 24px rgba(217, 232, 201, 0.25)", // Softer green shadow
  "0 4px 12px rgba(201, 232, 242, 0.4), 0 8px 24px rgba(201, 232, 242, 0.25)", // Softer blue shadow
];

const ResourceCard3D = ({ resource, index }) => {
  const bgColor = colorOptions[index % colorOptions.length];
  const shadow = shadowOptions[index % shadowOptions.length];

  return (
    <CardContainer containerClassName="py-5">
      <CardBody
        className={cn(
          "relative w-[80vw] sm:w-[24rem] h-auto rounded-xl p-5 border-2 border-gray-900 border-opacity-50 flex flex-col items-center"
        )}
        bg={bgColor}
        shadow={shadow}
      >
        <CardItem
          translateZ="60"
          className="text-xl text-shadow-lg font-bold text-black font-montserrat text-center w-full" 
        >
          {resource.title}
        </CardItem>
        <CardItem translateZ="200" className="w-full mt-4 flex justify-center">
          <img
            src={resource.img}
            className="w-20 h-20 object-cover rounded-full"
            alt={resource.title}
          />
        </CardItem>
        <CardItem
          as="p"
          translateZ="70"
          className="text-gray-700 text-sm max-w-xs mt-2 text-center font-roboto" 
        >
          {resource.desc}
        </CardItem>
        <CardItem translateZ="50" className="w-full mt-4 flex justify-center">
          <motion.a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black"
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
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default ResourceCard3D;