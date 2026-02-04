import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import WhySection from '../components/WhySection';
import TeamSection from '../components/TeamSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_ENDPOINTS } from '../config/api';
import EventDescription from '../components/Eventdesc';
import Updates2 from '../components/Updates2';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updates, setupdates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events and achievements in parallel
        const [eventsRes, achievementsRes, imageRes] = await Promise.all([
          fetch(API_ENDPOINTS.EVENTS),
          fetch(API_ENDPOINTS.ACHIEVEMENTS),
          fetch(API_ENDPOINTS.UPDATES)
        ]);

        const eventsData = eventsRes.ok ? await eventsRes.json() : [];
        const achievementsData = achievementsRes.ok ? await achievementsRes.json() : [];
        const imageData = imageRes.ok ? await imageRes.json() : []
        // Add status to events
        const updatedEvents = eventsData.map(event => ({
          ...event,
          status: new Date(event.date) > new Date() ? 'upcoming' : 'past'
        }));

        setEvents(updatedEvents);
        setAchievements(achievementsData);
        setupdates(imageData.map(img=>img.image));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set empty arrays on error so UI shows empty states instead of loading forever
        setEvents([]);
        setAchievements([]);
        setupdates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get upcoming events
  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 2);

  // Get latest achievements
  const latestAchievements = achievements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {
          updates.length>1 &&
        <Updates2 updates={updates}/>
        }
        {/* Quick Links Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Upcoming Events Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-4 text-ieeeBlue">Upcoming Events</h3>
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ) : upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No upcoming events</p>
                )}
                <Link 
                  to="/events"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
                >
                  View All Events →
                </Link>
              </div>

              {/* Latest Achievements Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-4 text-ieeeBlue">Latest Achievements</h3>
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ) : latestAchievements.length > 0 ? (
                  latestAchievements.map((achievement, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No achievements yet</p>
                )}
                <Link 
                  to="/achievements"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
                >
                  View All Achievements →
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <h3 className="text-xl font-semibold mb-4 text-ieeeBlue">Join IEEE SB MIET</h3>
                <p className="text-gray-600 mb-4">
                  Become a part of the world's largest technical professional organization 
                  and unlock countless opportunities.
                </p>
                <Link 
                  to="/join"
                  className="inline-block bg-ieeeBlue text-white px-6 py-2 rounded-full 
                           hover:bg-blue-700 transition duration-300"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why IEEE SB MIET Section */}
        <WhySection />

        {/* Latest Updates Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                           transition duration-300"
                >
                  <img 
                    src={Array.isArray(event.image) ? event.image[0] : event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                   <EventDescription description={event.description}/>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />

        {/* Call to Action Section */}
        <section className="py-16 bg-ieeeBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join IEEE SB MIET?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Take the first step towards your professional development and join our 
              community of innovators and tech enthusiasts.
            </p>
            <Link 
              to="/join"
              className="inline-block bg-white text-ieeeBlue px-8 py-3 rounded-full 
                       font-semibold hover:bg-gray-100 transition duration-300"
            >
              Become a Member
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;