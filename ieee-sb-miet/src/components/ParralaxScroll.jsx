"use client";
import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import ResourceCard from "./ResourceCard";

export const ParallaxScroll = ({ resources, className }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Trigger when section enters/exits viewport
  });

  // Enhanced parallax transforms for each column
  const translateFirst = useTransform(scrollYProgress, [0, 1], [100, -200]);  // Moves up, starts slightly below
  const translateSecond = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Moves down, starts slightly above
  const translateThird = useTransform(scrollYProgress, [0, 1], [150, -150]);  // Moves up, different speed

  // Additional transforms for subtle effects
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, -5]);       // Slight tilt left
  const rotateSecond = useTransform(scrollYProgress, [0, 1], [0, 0]);       // Slight tilt right
  const rotateThird = useTransform(scrollYProgress, [0, 1], [0, 5]);       // Slight tilt left
  const scaleFirst = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);   // Slight scale change
  const scaleSecond = useTransform(scrollYProgress, [0, 1], [1, 0.9]);      // Slight scale change
  const scaleThird = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);   // Slight scale change
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]); // Fade in/out

  // Split resources into three columns
  const third = Math.ceil(resources.length / 3);
  const firstPart = resources.slice(0, third);
  const secondPart = resources.slice(third, 2 * third);
  const thirdPart = resources.slice(2 * third);

  return (
    <div
      ref={targetRef}
      className={cn(
        "min-h-[150vh] w-full bg-white py-16 px-4 md:px-8 relative", // Increased height for more scroll space
        className
      )}
    >
      {/* Faint rainbow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-red-500/10 via-yellow-500/10 to-blue-500/10 opacity-20 blur-3xl" />
      </div>

      <h2 className="text-4xl md:text-5xl text-black font-roboto font-medium text-center mb-16 drop-shadow-md relative z-10">
        All Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-12 relative z-10">
        {/* First Column */}
        <motion.div
          className="grid gap-12"
          style={{
            y: translateFirst,
            rotate: rotateFirst,
            scale: scaleFirst,
            opacity,
          }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {firstPart.map((resource, idx) => (
            <div key={"grid-1" + idx}>
              <ResourceCard resource={resource} index={idx} />
            </div>
          ))}
        </motion.div>

        {/* Second Column */}
        <motion.div
          className="grid gap-12"
          style={{
            y: translateSecond,
            rotate: rotateSecond,
            scale: scaleSecond,
            opacity,
          }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {secondPart.map((resource, idx) => (
            <div key={"grid-2" + idx}>
              <ResourceCard resource={resource} index={idx + third} />
            </div>
          ))}
        </motion.div>

        {/* Third Column */}
        <motion.div
          className="grid gap-12"
          style={{
            y: translateThird,
            rotate: rotateThird,
            scale: scaleThird,
            opacity,
          }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {thirdPart.map((resource, idx) => (
            <div key={"grid-3" + idx}>
              <ResourceCard resource={resource} index={idx + 2 * third} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Example usage in ResourceSection

export default ParallaxScroll;