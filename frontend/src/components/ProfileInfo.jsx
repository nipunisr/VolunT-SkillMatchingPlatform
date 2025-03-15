import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProfileInfo = ({ user, setUser }) => {
  const [editing, setEditing] = useState({
    name: false,
    email: false,
    contact: false,
    location: false,
    duration: false
  });
  
  const [startDate, setStartDate] = useState(user.startDate ? new Date(user.startDate) : null);
  const [endDate, setEndDate] = useState(user.endDate ? new Date(user.endDate) : null);
  
  const [links, setLinks] = useState(user.links ? user.links.split(',').map(link => link.trim()) : []);
  
  const handleToggleEdit = (field) => {
    setEditing({
      ...editing,
      [field]: !editing[field]
    });
  };
  
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (setUser) {
      setUser({
        ...user,
        startDate: start,
        endDate: end,
        duration: start && end ? 
          `${start.toLocaleDateString()} - ${end.toLocaleDateString()}` : 
          ''
      });
    }
  };
  
  const handleAddLink = () => {
    setLinks([...links, '']);
  };
  
  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
    
    if (setUser) {
      setUser({
        ...user,
        links: newLinks.join(', ')
      });
    }
  };
  
  const handleRemoveLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    
    if (setUser) {
      setUser({
        ...user,
        links: newLinks.join(', ')
      });
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
      <div className="w-32 h-32 overflow-hidden bg-pink-200 rounded-full md:w-40 md:h-40">
        <img
          src={user.profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="flex-1 w-full max-w-xl space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block mb-1 font-medium text-gray-800">Name</label>
              <button 
                onClick={() => handleToggleEdit('name')}
                className="text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="User Name"
              defaultValue={user.name}
              disabled={!editing.name}
            />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block mb-1 font-medium text-gray-800">E-Mail</label>
              <button 
                onClick={() => handleToggleEdit('email')}
                className="text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Email"
              defaultValue={user.email}
              disabled={!editing.email}
            />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block mb-1 font-medium text-gray-800">Contact</label>
              <button 
                onClick={() => handleToggleEdit('contact')}
                className="text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Contact"
              defaultValue={user.contact}
              disabled={!editing.contact}
            />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block mb-1 font-medium text-gray-800">Location</label>
              <button 
                onClick={() => handleToggleEdit('location')}
                className="text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Location"
              defaultValue={user.location}
              disabled={!editing.location}
            />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block mb-1 font-medium text-gray-800">Duration</label>
              <button 
                onClick={() => handleToggleEdit('duration')}
                className="text-gray-500 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400">
              {editing.duration ? (
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  className="w-full outline-none"
                  placeholderText="Select date range"
                />
              ) : (
                <div className="text-gray-700">{user.duration || "Select date range"}</div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block mb-1 font-medium text-gray-800">Links</label>
              <button 
                onClick={handleAddLink}
                className="text-gray-500 hover:text-gray-700"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            {links.length === 0 && (
              <div className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md">
                <span className="text-gray-400">No links added</span>
              </div>
            )}
            {links.map((link, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Add link (e.g. github.com/username)"
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                />
                <button 
                  onClick={() => handleRemoveLink(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
