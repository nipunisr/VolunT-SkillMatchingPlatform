import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import LogoutButton from './LogoutButton';


const OrganizerNavbar = () => {

  return (
    <nav className="flex justify-between items-center py-4 bg-white container px-4 mx-auto">
      <div className="flex items-center gap-2">
        <img 
          src={logo} 
          alt="Volunteer Connect Logo"
          className="w-28 h-28"
        />
      </div>
      <div className="flex gap-8">
        <Link to="/organizer/dashboard" className="font-semibold text-[#E17335]">Home</Link>
        <Link to="/organizer/applications">Applications</Link>
        <Link to="/organizer/notifications">Notifications</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div className="flex items-center gap-4">
        <div 
          className="bg-[#2D0C3E] text-white px-4 py-2 rounded" >
         <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;
