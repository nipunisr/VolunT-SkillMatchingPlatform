import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';

const NavBarCommon = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Volunteer Connect Logo"
            className="w-28 h-28"
          />
        </Link>
        
        <div className="hidden text-xl font-medium space-x-11 md:flex">
          <Link to="/" className="font-medium text-[#E17335]">Home</Link>
          <Link 
            to={user ? (user.userType === 'volunteer' ? '/my-events' : '/my-opportunities') : '#'}
            className="text-gray-700 hover:text-[#E17335] transition-colors"
          >
            {user ? (user.userType === 'volunteer' ? 'My Events' : 'My Opportunities') : 'My Events'}
          </Link>
          <Link to="/notifications" className="text-gray-700 hover:text-[#E17335] transition-colors">
            Notifications
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-[#E17335] transition-colors">
            About Us
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to={user.userType === 'volunteer' ? '/volunteer-profile' : '/organizer-profile'}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-[#29142C] rounded-md hover:bg-[#3a1d3f] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-white bg-[#29142C] rounded-md hover:bg-[#3a1d3f] transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/create-account" 
                className="px-4 py-2 text-sm font-medium text-white bg-[#E17335] rounded-md hover:bg-[#f18245] transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBarCommon;