"use client";
import React, { useState, useEffect } from "react";
import ResourceCard3D from "../components/ResourceCard3d";
import Slider from "react-slick";
const popularResources = [
  { id: 1, title: "IEEE Students", desc: "Student community resources.", img: "/assets/images/ieee_students.png", link: "https://students.ieee.org" },
  { id: 2, title: "IEEE Village", desc: "Local chapter resources.", img: "/assets/images/ieee_village.png", link: "https://village.ieee.org" },
  { id: 3, title: "IEEE Human", desc: "Humanitarian initiatives.", img: "/assets/images/ieee_human.png", link: "https://humanitarian.ieee.org" },
  { id: 4, title: "IEEE TV", desc: "Video content platform.", img: "/assets/images/ieee_tv.png", link: "https://tv.ieee.org" },
  { id: 5, title: "IEEE Sight", desc: "Special interest groups.", img: "/assets/images/ieee_sight.png", link: "https://sight.ieee.org" },
];

const PopularResourcesSection = ({popularResources}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "-60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-16 md:px-8 relative flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl text-black font-roboto font-medium text-center mb-12 drop-shadow-md relative z-10">
        Popular Resources
      </h2>
      {isMobile ? (
        <div className="w-full flex flex-col items-center gap-8">
          {popularResources.map((resource, index) => (
            <div key={resource.id} className="w-full">
              <ResourceCard3D resource={resource} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full max-w-6xl">
          <Slider {...settings}>
            {popularResources.map((resource, index) => (
              <div key={resource.id} className="">
                <ResourceCard3D resource={resource} index={index} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default PopularResourcesSection;