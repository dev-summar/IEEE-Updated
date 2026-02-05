import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import siteData from "../utils/siteData";
import mietLogo from "../assets/miet-logo-white.png";
import ieeeLogo from "../assets/IEEE.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-200" : "text-white";
  };

  return (
    <nav className="bg-ieeeBlue fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={mietLogo} alt="MIET Logo" className="h-16" />
            <img src={ieeeLogo} alt="IEEE Logo" className="h-16" />
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {siteData.navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href}
                  className={`hover:text-gray-200 transition duration-300 ${isActive(link.href)}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-white"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="pt-4 pb-3">
              {siteData.navLinks.map((link) => (
                <li key={link.name} className="py-2">
                  <Link 
                    to={link.href}
                    className={`block hover:text-gray-200 transition duration-300 ${isActive(link.href)}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;