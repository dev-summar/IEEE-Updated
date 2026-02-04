import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">About IEEE SB MIET</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 text-ieeeBlue">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              IEEE Student Branch MIET is dedicated to fostering technological innovation 
              and excellence for the benefit of humanity. We strive to inspire, educate, 
              and connect students in the fields of engineering and technology.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 text-ieeeBlue">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be the leading technical community at MIET, empowering students with 
              knowledge, skills, and opportunities to shape the future of technology.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 text-ieeeBlue">What We Do</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>Organize technical workshops and seminars</li>
              <li>Host industry expert talks and conferences</li>
              <li>Conduct hands-on training sessions</li>
              <li>Facilitate networking opportunities</li>
              <li>Support research and development activities</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About; 