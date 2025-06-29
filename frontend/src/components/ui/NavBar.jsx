import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const NavBar = () => {
  return (
    <nav className="py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 mx-auto ">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} viewBox="0 0 200 200" className="w-28 h-28 text-[#E17335]"/>
          </Link>
        </div>
        
        <div className="hidden text-xl font-medium space-x-11 md:flex">
          <Link to="/" className="font-medium text-[#E17335]">Home</Link>
          <Link to="/my-events" className="text-gray-700 transition-colors hover:text-[#E17335]">My Events</Link>
          <Link to="/notifications" className="text-gray-700 transition-colors hover:text[#E17335]">Notifications</Link>
          <Link to="/about" className="text-gray-700 transition-colors hover:text-[#E17335]">About Us</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/volunteer-profile" className="text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
          <button className="px-4 py-2 text-m font-medium text-white bg-[#29142C] rounded-md">Log Out</button>
        </div>
      </div>
    </nav>
  );
};


export default NavBar;