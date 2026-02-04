import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const TeamSection = () => {
  const [teamData, setTeamData] = useState({
    branchCounselor: [],
    facultyCoordinators: [],
    ieeeSbTeam: [],
    wieTeam: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.TEAM);
        // Backend returns data organized by section (branchCounselor, facultyCoordinators, etc.)
        setTeamData(response.data);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Failed to load team data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const TeamMemberCard = ({ member }) => (
    <div
      className="flex-shrink-0 w-72 md:w-auto flex flex-col items-center bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
      style={{ minHeight: "300px" }}>
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1 text-center">
        {member.name}
      </h3>
      <p className="text-gray-600 mb-2 text-center">
        {member.position}
      </p>
      <p className="text-gray-500 mb-4 text-center text-sm">
        {member.department}
      </p>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center w-full h-12 bg-blue-600 text-white 
                 font-semibold rounded-lg transition duration-300 hover:bg-blue-700">
        Connect on LinkedIn
      </a>
    </div>
  );

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Dedicated individuals working together to make IEEE SB MIET a hub of
          innovation and learning.
        </p>

        {/* Branch Counselors Section */}
        <h3 className="text-2xl font-bold text-center mb-8">
          Branch Counselors
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {teamData.branchCounselor.length > 0 ? (
            teamData.branchCounselor.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
                style={{ width: "250px", height: "300px" }}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-1">{member.position}</p>
                {member.title && member.title.length>1 && <p className="text-gray-600 mb-1">{member.title}</p>}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full h-10 bg-blue-600 text-white 
                           font-semibold rounded-lg transition duration-300 hover:bg-blue-700 mt-3">
                  Connect on LinkedIn
                </a>
              </div>
            ))
          ) : (
            <p>No branch counselors available.</p>
          )}
        </div>

        {/* Faculty Coordinators Section */}
        <h3 className="text-2xl font-bold text-center mb-8 mt-16">
          Faculty Coordinators
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {teamData.facultyCoordinators.length > 0 ? (
            teamData.facultyCoordinators.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
                style={{ width: "250px", height: "300px" }}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.position}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full h-10 bg-blue-600 text-white 
                           font-semibold rounded-lg transition duration-300 hover:bg-blue-700">
                  Connect on LinkedIn
                </a>
              </div>
            ))
          ) : (
            <p>No faculty coordinators available.</p>
          )}
        </div>

        {/* IEEE SB Team 2024-25 Section */}
        <h3 className="text-2xl font-bold text-center mb-8 mt-16">
          IEEE SB Team 2024-25
        </h3>
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto md:overflow-x-visible">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {teamData.ieeeSbTeam.length > 0 ? (
                teamData.ieeeSbTeam.map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))
              ) : (
                <p>No IEEE SB team members available.</p>
              )}
            </div>
          </div>
        </div>

        {/* WIE Team 2024-25 Section */}
        <h3 className="text-2xl font-bold text-center mb-8 mt-16">
          WIE Team 2024-25
        </h3>
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto md:overflow-x-visible">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {teamData.wieTeam.length > 0 ? (
                teamData.wieTeam.map((member, index) => (
                  <TeamMemberCard key={index} member={member} />
                ))
              ) : (
                <p>No WIE team members available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;