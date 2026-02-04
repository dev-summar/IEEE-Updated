import React, { useEffect, useState } from 'react';
import siteData from '../utils/siteData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_ENDPOINTS } from '../config/api';
const Achievements = () => {
  const [achievements, setachievements] = useState([])
  useEffect(() => {
    const fetchAchievements = async () => {
        try {
          const response = await fetch(API_ENDPOINTS.ACHIEVEMENTS);
          const data = await response.json();
          setachievements(data);
        } catch (error) {
          console.log('Error fetching achievements:', error);
        }
      };
    fetchAchievements();
  }, [])
  
  return (
    <>
    <Navbar/>
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Achievements</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements?.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform 
                       hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="h-48">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{achievement.date}</span>
                </div>
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

export default Achievements; 