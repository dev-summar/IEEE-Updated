import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { API_ENDPOINTS, getAuthHeader } from '../../config/api';
import AchievementForm from './components/AchievementForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import CloudinaryImage from '../../components/CloudinaryImage';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ACHIEVEMENTS);
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <button
          onClick={() => {
            setSelectedAchievement(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Achievement
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div 
            key={achievement._id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="aspect-video">
              <CloudinaryImage
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
              <p className="text-sm font-medium text-gray-600 mt-2">{achievement.date}</p>
              
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setSelectedAchievement(achievement);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedAchievement(achievement);
                    setShowDelete(true);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Form Modal */}
      {showForm && (
        <AchievementForm
          achievement={selectedAchievement}
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            setShowForm(false);
            fetchAchievements();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <DeleteConfirmation
          title="Delete Achievement"
          message="Are you sure you want to delete this achievement? This action cannot be undone."
          onConfirm={async () => {
            try {
              await fetch(API_ENDPOINTS.ACHIEVEMENT(selectedAchievement._id), {
                method: 'DELETE',
                headers: getAuthHeader()
              });
              fetchAchievements();
            } catch (error) {
              console.error('Error deleting achievement:', error);
            }
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
};

export default Achievements;