import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import siteData from '../utils/siteData';
import { API_ENDPOINTS, checkRegistrationStatus } from '../config/api';
import EventDescription from '../components/Eventdesc';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Events = () => {
  const [events, setevents] = useState([])
  const [currentImage, setCurrentImage] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
        try {
          const response = await fetch(API_ENDPOINTS.EVENTS);
          const data = await response.json();
          const updatedEvents = data.map(event => ({
            ...event,
            status: new Date(event.date) > new Date() ? 'upcoming' : 'past'
          }));
          setevents(updatedEvents);
          setCurrentImage(
            updatedEvents.reduce((acc, event) => {
              acc[event._id] = 0;
              return acc;
            }, {})
          );
    
        } catch (error) {
          console.log('Error fetching events:', error);
        }
      };
      fetchEvents();
  }, [])
  const [activeTab, setActiveTab] = useState('upcoming');

  // Filter events based on status
  const upcomingEvents = events && events.filter(event => event.status === 'upcoming');
  const pastEvents = events && events.filter(event => event.status === 'past');

  const getRegistrationButton = (event) => {
    const status = checkRegistrationStatus(event);
    
    switch (status) {
      case 'open':
        return (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md 
                     hover:bg-blue-700 transition-colors duration-300 text-center inline-block"
          >
            Register Now
          </a>
        );
      
      case 'coming_soon':
        return (
          <button
            disabled
            className="mt-6 w-full bg-gray-400 text-white py-2 rounded-md 
                     cursor-not-allowed"
          >
            Registration Coming Soon
          </button>
        );
      
      case 'closed':
        return (
          <button
            disabled
            className="mt-6 w-full bg-red-400 text-white py-2 rounded-md 
                     cursor-not-allowed"
          >
            Registration Closed
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">IEEE SB MIET Events</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us for exciting technical workshops, conferences, and networking events. 
              Stay updated with our latest activities and opportunities.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'upcoming'
                    ? 'bg-ieeeBlue text-white'
                    : 'text-gray-600 hover:text-ieeeBlue'
                  }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeTab === 'past'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Past Events
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events && (activeTab === 'upcoming' ? upcomingEvents : pastEvents).map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl 
                         transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden group">
                <img
                  key={currentImage[event._id]}
                  src={event.image?.[currentImage[event._id] || 0]}
                  alt={event.title}
                  className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
                />

                {event.image?.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(prev => ({
                        ...prev,
                        [event._id]: (prev[event._id] - 1 + event.image.length) % event.image.length
                      }));
                    }}
                    className="absolute left-2 bottom-1 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full shadow-md hover:bg-black/70 hover:scale-110 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0"
                    aria-label="Previous Image"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                )}

                {event.image?.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(prev => ({
                        ...prev,
                        [event._id]: (prev[event._id] + 1) % event.image.length
                      }));
                    }}
                    className="absolute right-2 bottom-1 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full shadow-md hover:bg-black/70 hover:scale-110 transition-all duration-300 ease-in-out group-hover:opacity-100 opacity-0"
                    aria-label="Next Image"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                )}

                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <EventDescription description={event.description}/>
                  {/* Event Metadata */}
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" 
                           viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" 
                           viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Registration Button (for upcoming events) */}
                  {activeTab === 'upcoming' && getRegistrationButton(event)}

                  {/* View Details Button (for past events) */}
                  {activeTab === 'past' && event.gallery && (
                    <button
                      className="mt-6 w-full border border-blue-600 text-blue-600 py-2 
                               rounded-md hover:bg-blue-50 transition-colors duration-300"
                    >
                      View Gallery
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {((activeTab === 'upcoming' && upcomingEvents.length === 0) || 
            (activeTab === 'past' && pastEvents.length === 0)) && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">
                {activeTab === 'upcoming' 
                  ? 'No upcoming events at the moment. Check back soon!' 
                  : 'No past events to display.'}
              </h3>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;