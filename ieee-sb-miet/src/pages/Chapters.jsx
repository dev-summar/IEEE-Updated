import React from 'react';
import { Link } from 'react-router-dom';
import siteData from '../utils/siteData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Chapters = () => {
  return (
    <>
    <Navbar/>
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">IEEE MIET Chapters</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.chapters?.map((chapter, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 bg-ieeeBlue">
                <img
                  src={chapter.logo}
                  alt={chapter.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3">{chapter.name}</h2>
                <p className="text-gray-600 mb-4">{chapter.description}</p>
                <div className="space-y-2">
                  <h3 className="font-medium">Focus Areas:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {chapter.focusAreas.map((area, idx) => (
                      <li key={idx}>{area}</li>
                    ))}
                  </ul>
                </div>
                <Link to={`/chapters/${chapter.id}`} className="mt-4 inline-block bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition duration-300 hover:bg-blue-700">
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Chapters; 