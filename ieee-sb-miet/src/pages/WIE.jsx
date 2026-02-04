import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WIE = () => {
    return (
      <>
        <Navbar />
        {/* Previous sections remain the same until Featured Articles */}
        <div className="min-h-screen bg-pink-50 text-gray-800 pt-16 md:pt-20">
          <div className="px-4 md:px-6">
            {/* Hero Section */}
            <div className="text-center py-10 md:py-20 bg-pink-300 rounded-3xl shadow-xl px-4 md:px-6 mt-4">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold italic text-pink-900">
                Women in Engineering
              </h1>
              <p className="text-lg md:text-xl mt-3 md:mt-4 italic text-pink-800">
                Empowering Women, Inspiring Innovation
              </p>
              <p className="text-base md:text-lg mt-3 md:mt-4 text-pink-800 max-w-2xl mx-auto">
                Join our community of ambitious women engineers shaping the future of technology
              </p>
            </div>
          </div>
  
          <div className="px-4 md:px-6">
            {/* About Section */}
            <div className="mt-10 md:mt-16 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl italic text-pink-900 font-semibold">About WIE</h2>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-pink-700 leading-relaxed">
                Women in Engineering (WIE) is dedicated to supporting and uplifting women in the field of engineering by providing mentorship, networking, and skill development opportunities. Our goal is to create an inclusive environment where women can thrive and lead the future of technology.
              </p>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-pink-700 leading-relaxed">
                Founded in 2015, WIE has grown into a global community of over 10,000 members across 50 countries. Through our initiatives, we've helped countless women advance their careers, develop crucial leadership skills, and make meaningful connections in the industry.
              </p>
            </div>
  
            {/* Featured Articles Section - Updated with images */}
            <div className="mt-10 md:mt-16">
              <h2 className="text-3xl md:text-4xl text-center italic text-pink-900 font-semibold">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src="https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/Women-In-STEM-Statistics-Hero-2.webp" 
                      alt="Women breaking barriers in STEM" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl italic text-pink-800 font-medium">
                      Breaking Barriers in STEM
                    </h3>
                    <p className="text-sm mt-2 md:mt-3 text-gray-600">
                      Discover how women engineers are overcoming challenges and making a lasting impact in STEM fields. Through innovative programs and initiatives, we're addressing gender gaps in engineering education and workforce representation.
                    </p>
                    <p className="text-sm mt-2 md:mt-3 text-gray-600">
                      Featured: Interview with Dr. Sarah Chen, pioneering quantum computing researcher at MIT.
                    </p>
                  </div>
                </div>
  
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src="https://www.ifpma.org/wp-content/uploads/2022/02/Women-led-innovation-in-Africa-Quote-Card_JN-920x518.png" 
                      alt="Women-led innovations" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl italic text-pink-800 font-medium">
                      Women-Led Innovations
                    </h3>
                    <p className="text-sm mt-2 md:mt-3 text-gray-600">
                      Explore groundbreaking innovations led by women in engineering and technology. From sustainable energy solutions to breakthrough medical devices, women engineers are at the forefront of solving global challenges.
                    </p>
                    <p className="text-sm mt-2 md:mt-3 text-gray-600">
                      Spotlight: Revolutionary water purification system developed by Engineer Maria Rodriguez.
                    </p>
                  </div>
                </div>
  
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk44PVRQ1KmtVmXZCtJXwLnFxJJft-eY6arg&s" 
                      alt="Mentorship in engineering" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl italic text-pink-800 font-medium">
                      The Importance of Mentorship
                    </h3>
                    <p className="text-sm mt-2 md:mt-3 text-gray-600">
                      Learn how mentorship programs are shaping the future of women in engineering. Our structured mentorship program has matched over 5,000 mentees with experienced professionals.
                    </p>
                    <p className="text-sm mt-2 md:mt-3 text-gray-600">
                      Success Story: How mentorship helped Jessica Kim become a Senior Software Architect at Google.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          {/* Past Events Section */}
          <div className="mt-10 md:mt-16 mb-8">
            <h2 className="text-3xl md:text-4xl text-center italic text-pink-900 font-semibold">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-6">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl md:text-2xl mt-2 md:mt-4 italic text-pink-800 font-medium">
                  Tech Talk 2023
                </h3>
                <p className="text-sm mt-2 md:mt-3 text-gray-600">
                  An insightful session with women leaders in the tech industry. Featured speakers included CTOs from Fortune 500 companies discussing AI ethics, sustainable technology, and the future of work.
                </p>
                <p className="text-sm mt-2 md:mt-3 font-medium text-pink-600">
                  Impact: 85% of attendees reported enhanced career clarity
                </p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl md:text-2xl mt-2 md:mt-4 italic text-pink-800 font-medium">
                  WIE Hackathon
                </h3>
                <p className="text-sm mt-2 md:mt-3 text-gray-600">
                  A 24-hour coding challenge for aspiring female engineers. Teams developed innovative solutions for healthcare, education, and environmental challenges.
                </p>
                <p className="text-sm mt-2 md:mt-3 font-medium text-pink-600">
                  Results: 50 projects developed, 3 received startup funding
                </p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl md:text-2xl mt-2 md:mt-4 italic text-pink-800 font-medium">
                  STEM Outreach
                </h3>
                <p className="text-sm mt-2 md:mt-3 text-gray-600">
                  Encouraging young girls to explore STEM careers through interactive workshops, lab visits, and hands-on engineering projects. Reached over 5,000 students across 100 schools.
                </p>
                <p className="text-sm mt-2 md:mt-3 font-medium text-pink-600">
                  Outcome: 70% increase in STEM program enrollment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WIE;