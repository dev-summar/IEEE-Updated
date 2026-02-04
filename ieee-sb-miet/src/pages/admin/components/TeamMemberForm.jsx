import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, getAuthHeader } from '../../../config/api';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TeamMemberForm = ({ section }) => {
  const initialState = {
    name: '',
    position: '',
    title: '',
    department: '',
    linkedin: '',
    image: null
  };

  const [formData, setFormData] = useState(initialState);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  useEffect(() => {
    fetchMembers();
  }, [section]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.TEAM_BY_SECTION(section));
      setMembers(response.data);
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to fetch team members');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedMember((prev) => ({ ...prev, image: file }));
  };
  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          formDataToSend.append('image', formData[key]);
        } else if (key !== 'image') {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('section', section);

      await axios.post(API_ENDPOINTS.TEAM, formDataToSend, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormData(initialState);
      fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add team member');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      ['name', 'position', 'title', 'department', 'linkedin', 'section'].forEach(key => {
        const value = key === 'section' ? section : selectedMember[key];
        if (value !== undefined && value !== null && value !== '') {
          formDataToSend.append(key, value);
        }
      });
      // Only append image if it's a new File (from file input), not existing URL
      if (selectedMember.image && selectedMember.image instanceof File) {
        formDataToSend.append('image', selectedMember.image);
      }
      await axios.put(API_ENDPOINTS.TEAM_MEMBER(selectedMember._id), formDataToSend, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      setSelectedMember(null);
      setShowForm(false);
      fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to edit team member');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await axios.delete(API_ENDPOINTS.TEAM_MEMBER(id), {
        headers: getAuthHeader()
      });
      fetchMembers();
    } catch (err) {
      setError('Failed to delete team member');
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title (optional)</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {(section === 'ieeeSbTeam' || section === 'wieTeam') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                     ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>

      {/* Display Current Members */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Current Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div key={member._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-gray-600">{member.position}</p>
                  {member.department && (
                    <p className="text-gray-500">{member.department}</p>
                  )}
                </div>
                <div className='flex gap-2'>
                <button
                 onClick={() => handleEdit(member)}
                  className="text-blue-600 hover:text-blue-800"
                  >
                  <PencilIcon className='h-5 w-5'/>
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="text-red-600 hover:text-red-800"
                  >
                  <TrashIcon className='h-5 w-5'/>
                </button>
                  </div>
              </div>
              <img 
                src={member.image} 
                alt={member.name}
                className="w-20 h-20 object-cover rounded-full mt-2"
              />
            </div>
          ))}
        </div>
      </div>
      {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5 relative">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-semibold">Edit Team Member Details</h2>
        <button onClick={() => setShowForm(false)} className="text-gray-700 hover:text-gray-900">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit2} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={selectedMember.name}
            onChange={handleEditInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input
            type="text"
            name="position"
            value={selectedMember.position}
            onChange={handleEditInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title (optional)</label>
          <input
            type="text"
            name="title"
            value={selectedMember.title}
            onChange={handleEditInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300"
          />
        </div>

        {(section === 'ieeeSbTeam' || section === 'wieTeam') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={selectedMember.department}
              onChange={handleEditInputChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={selectedMember.linkedin}
            onChange={handleEditInputChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleEditImageChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default TeamMemberForm;