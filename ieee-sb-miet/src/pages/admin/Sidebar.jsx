import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, CalendarIcon, PhotoIcon, 
  TrophyIcon, BookOpenIcon, DocumentIcon,
  XMarkIcon, FilmIcon, UserGroupIcon, // Add this import
  Cog6ToothIcon // Add this for settings
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Events', href: '/admin/events', icon: CalendarIcon },
    { name: 'Gallery', href: '/admin/gallery', icon: PhotoIcon },
    { name: 'Achievements', href: '/admin/achievements', icon: TrophyIcon },
    { name: 'Chapters', href: '/admin/chapters', icon: BookOpenIcon },
    { name: 'Reports', href: '/admin/reports', icon: DocumentIcon },
    {name:'Banners', href: '/admin/banners', icon:FilmIcon},
    { name: 'Team Management', href: '/admin/team', icon: UserGroupIcon },
    { name: 'Student Applications', href: '/admin/students', icon: UserGroupIcon },
    { name: 'Hero Settings', href: '/admin/hero-settings', icon: Cog6ToothIcon },
    { name: 'Updates', href: '/admin/updates', icon: PhotoIcon },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 h-screen w-64 bg-white shadow-lg
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
      `}>
        <div className="h-full flex flex-col">
          {/* Logo and Title */}
          <div className="flex items-center justify-between h-16 px-4 border-b shrink-0">
            <Link to="/admin/dashboard" className="flex items-center">
              <img src="/assets/images/ieee-blue-logo.png" alt="IEEE Logo" className="h-12 w-auto object-contain" />
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium
                    ${active 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon 
                    className={`
                      mr-3 h-5 w-5
                      ${active ? 'text-blue-700' : 'text-gray-400'}
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
