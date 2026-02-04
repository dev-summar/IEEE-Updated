import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, PhotoIcon, TrophyIcon, 
  DocumentIcon, ChartBarIcon, UserGroupIcon 
} from '@heroicons/react/24/outline';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { API_ENDPOINTS, getAuthHeader } from '../../config/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    gallery: 0,
    achievements: 0,
    reports: 0
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STATS, {
          headers: getAuthHeader()
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Transform stats data for the chart
  const chartData = [
    {
      name: 'Events',
      count: stats.events,
      color: '#3B82F6' // blue-500
    },
    {
      name: 'Gallery',
      count: stats.gallery,
      color: '#8B5CF6' // purple-500
    },
    {
      name: 'Achievements',
      count: stats.achievements,
      color: '#22C55E' // green-500
    },
    {
      name: 'Reports',
      count: stats.reports,
      color: '#F97316' // orange-500
    }
  ];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border">
          <p className="text-sm font-medium text-gray-900">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const cards = [
    {
      title: 'Events',
      count: stats.events,
      icon: CalendarIcon,
      link: '/admin/events',
      color: 'bg-blue-500'
    },
    {
      title: 'Gallery Items',
      count: stats.gallery,
      icon: PhotoIcon,
      link: '/admin/gallery',
      color: 'bg-purple-500'
    },
    {
      title: 'Achievements',
      count: stats.achievements,
      icon: TrophyIcon,
      link: '/admin/achievements',
      color: 'bg-green-500'
    },
    {
      title: 'Reports',
      count: stats.reports,
      icon: DocumentIcon,
      link: '/admin/reports',
      color: 'bg-orange-500'
    }
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">
                      {card.count}
                    </p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Activity Graph */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Activity Overview
        </h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Summary
        </h2>
        <div className="space-y-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        {/* Add recent activity list here */}
      </div>
    </div>
  );
};

export default Dashboard;
