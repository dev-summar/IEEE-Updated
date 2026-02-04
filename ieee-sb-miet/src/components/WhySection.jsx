import React from "react";
import siteData from "../utils/siteData";

const WhySection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why IEEE SB MIET?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src={siteData.whySection.image}
              alt="IEEE SB MIET Activities"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-600 rounded-lg -z-10" />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-ieeeBlue">
                Innovation & Growth
              </h3>
              <p className="text-gray-600">
                Join a community dedicated to fostering technical innovation and 
                personal growth through hands-on projects and workshops.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Networking Opportunities
              </h3>
              <p className="text-gray-600">
                Connect with industry professionals, academics, and fellow students
                through our extensive network of IEEE members.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Professional Development
              </h3>
              <p className="text-gray-600">
                {siteData.whySection.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
