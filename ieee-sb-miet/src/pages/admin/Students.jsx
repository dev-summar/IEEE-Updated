import React, { useState, useEffect } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { API_ENDPOINTS } from '../../config/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB"); // Extracts YYYY-MM-DD
};
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.STUDENTS);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportStudents = () => {
    const csvContent = [
      ['Date','Student ID', 'Name', 'Email', 'Branch'],
      ...students.map(student => [`\t${formatDate(student.createdAt)}`,student.id, student.name, student.email, student.branch])
    ]
      .map(e => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <button
          onClick={exportStudents}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>
        {loading && <p>Loading...</p>}
      {students.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <h3 className="mt-4 text-lg font-medium text-gray-900">No students found</h3>
          <p className="mt-2 text-sm text-gray-500">Student records will appear here once added.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {students.map(student => (
        <tr key={student.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(student.createdAt).toString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      )}
    </div>
  );
};

export default Students;