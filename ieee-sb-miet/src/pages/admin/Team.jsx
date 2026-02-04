import React, { useState } from 'react';
import TeamMemberForm from './components/TeamMemberForm';

const Team = () => {
  const [activeSection, setActiveSection] = useState('branchCounselor');

  const sections = [
    { id: 'branchCounselor', name: 'Branch Counselors' },
    { id: 'facultyCoordinators', name: 'Faculty Coordinators' },
    { id: 'ieeeSbTeam', name: 'IEEE SB Team' },
    { id: 'wieTeam', name: 'WIE Team' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team Management</h1>
      
      {/* Section Tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow p-6">
        <TeamMemberForm section={activeSection} />
      </div>
    </div>
  );
};

export default Team;