"use client";
import React, { useEffect, useRef } from "react";
import { ParallaxScroll } from "../components/ParralaxScroll"; 
import PopularResourcesSection from "./PopularResource"; 
const allResources = [
  { id: 1, title: "IEEE Job Site", desc: "Job opportunities for engineers and tech professionals.", img: "/assets/images/ieee_job.webp", link: "https://jobs.ieee.org/", popular: false },
  { id: 2, title: "IEEE Center for Leadership Excellence", desc: "Leadership training and resources.", img: "/assets/images/ieee_cole.png", link: "https://ieee-elearning.org/CLE/", popular: false },
  { id: 3, title: "IEEE Students", desc: "Student community resources and support.", img: "/assets/images/ieee_students.png", link: "https://students.ieee.org/", popular: false },
  { id: 4, title: "IEEE Humanitarian Technologies Board", desc: "Advancing technology for humanitarian causes.", img: "/assets/images/ieee_human.png", link: "https://www.ieee.org/about/corporate/humanitarian-activities.html", popular: false },
  { id: 5, title: "IEEE Xplore", desc: "Digital library for research papers and standards.", img: "/assets/images/ieee_xplore.png", link: "https://ieeexplore.ieee.org/", popular: true },
  { id: 6, title: "IEEE Author Center", desc: "Guidance for authors publishing with IEEE.", img: "/assets/images/ieee_authorcenter.png", link: "https://journals.ieeeauthorcenter.ieee.org/", popular: false },
  { id: 7, title: "IEEE Smart Village", desc: "Empowering off-grid communities with sustainable energy.", img: "/assets/images/ieee_village.png", link: "https://smartvillage.ieee.org/", popular: false },
  { id: 8, title: "IEEE-USA", desc: "Advocacy and career resources for U.S. members.", img: "/assets/images/ieee_usa.png", link: "https://ieeeusa.org/", popular: false },
  { id: 9, title: "IEEE-SA (Standards Association)", desc: "Developing global standards for technology.", img: "/assets/images/ieee_sa.png", link: "https://standards.ieee.org/", popular: true },
  { id: 10, title: "IEEE Potentials", desc: "Magazine for students and young professionals.", img: "/assets/images/ieee_potentials.png", link: "https://potentials.ieee.org/", popular: false },
  { id: 11, title: "TryEngineering", desc: "STEM resources and educational materials.", img: "/assets/images/ieee_try.png", link: "https://tryengineering.org/", popular: false },
  { id: 12, title: "IEEE Spectrum", desc: "News and insights on engineering and technology.", img: "/assets/images/ieee_spectrum.jpg", link: "https://spectrum.ieee.org/", popular: true },
  { id: 13, title: "IEEE Learning Network", desc: "Online courses and professional development.", img: "/assets/images/ieee_learning.png", link: "https://iln.ieee.org/", popular: true },
  { id: 14, title: "IEEE Volunteering", desc: "Opportunities for volunteering within IEEE.", img: "/assets/images/ieee_volunteering.png", link: "https://volunteer.ieee.org/", popular: false },
  { id: 15, title: "IEEE Entrepreneurship", desc: "Supporting innovation and startups.", img: "/assets/images/ieee_enterpren.png", link: "https://entrepreneurship.ieee.org/", popular: false },
  { id: 16, title: "IEEE Collabratec", desc: "Professional networking and collaboration platform.", img: "/assets/images/ieee_collab.png", link: "https://ieee-collabratec.ieee.org/", popular: true },
  { id: 17, title: "IEEE Young Professionals", desc: "Career resources for early-career members.", img: "/assets/images/ieee_young.png", link: "https://yp.ieee.org/", popular: false },
  { id: 18, title: "IEEE SIGHT", desc: "Humanitarian technology and social impact initiatives.", img: "/assets/images/ieee_sight.png", link: "https://sight.ieee.org/", popular: false },
  { id: 19, title: "IEEE.tv", desc: "Videos on technology and engineering topics.", img: "/assets/images/ieee_tv.png", link: "https://ieeetv.ieee.org/", popular: false },
  { id: 20, title: "IEEE REACH", desc: "Educational resources linking history and technology.", img: "/assets/images/ieee_reach.jpg", link: "https://reach.ieee.org/", popular: false },

];
const popularResourcesList = allResources.filter((r) => r.popular);
const otherResources = allResources.filter((r) => !r.popular);

const ResourceSection = () => {
  return (
    <div className="bg-white py-8 px-4 md:px-8 relative overflow-hidden">
      {/* Popular Resources Carousel */}
      <section className="relative z-10">
        <PopularResourcesSection popularResources={popularResourcesList} />
      </section>

      {/* Other Resources Parallax Scroll */}
      <section className="relative z-10 mt-16">
        <div className="max-w-6xl mx-auto">
          <ParallaxScroll resources={otherResources} />
        </div>
      </section>
    </div>
  );
};

export default ResourceSection;