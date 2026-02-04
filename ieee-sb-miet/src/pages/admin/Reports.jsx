import React, { useState, useEffect } from 'react';
import { PlusIcon, DocumentIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { API_ENDPOINTS, getAuthHeader } from '../../config/api';
import ReportForm from './components/ReportForm';
import DeleteConfirmation from './components/DeleteConfirmation';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState('annual'); // 'annual' or 'event'

  useEffect(() => {
    fetchReports();
  }, [activeTab]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.REPORTS_BY_TYPE(activeTab), {
        headers: getAuthHeader()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const data = await response.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(API_ENDPOINTS.REPORT(id), {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Upload Report
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('annual')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'annual'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Annual Reports
        </button>
        <button
          onClick={() => setActiveTab('event')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'event'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Event Reports
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center">
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading your first report
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Upload Report
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reports.map((report) => (
              <div key={report._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DocumentIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-500">
                      {report.type === 'annual' ? `Year: ${report.year}` : 'Event Report'}
                    </p>
                  </div>
                </div>
                  <div className="flex items-center space-x-2">
                  <a
                    href={API_ENDPOINTS.REPORT_FILE_BY_ID(report.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Download report"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setShowDelete(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Upload Form Modal */}
      {showForm && (
        <ReportForm
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            setShowForm(false);
            fetchReports();
          }}
          type={activeTab}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <DeleteConfirmation
          title="Delete Report"
          message="Are you sure you want to delete this report? This action cannot be undone."
          onConfirm={async () => {
            await handleDelete(selectedReport._id);
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
};

export default Reports;