import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hand from '../assets/images/hand2hand.png';
import { fetchEvents } from '../services/api';
import EventCard from '../components/Ecards';

const HomePage = () => {
   const [events, setEvents] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('name'); 
    const [keyword, setKeyword] = useState('');
    const [mode, setMode] = useState('all'); 
    const [loading, setLoading] = useState(true);
  

  const loadEvents = async () => {
      setLoading(true);
      try {
        const filters = {};
  
        if (searchCriteria === 'name') {
          filters.keyword = keyword.trim();
        } else if (searchCriteria === 'location') {
          filters.location = keyword.trim();
        } else if (searchCriteria === 'mode' && mode !== 'all') {
          filters.eventType = mode;
        }
  
        const data = await fetchEvents(filters);
        setEvents(data);
      } catch (err) {
        setEvents([]);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      loadEvents();
    }, []);
  
    const handleSearch = (e) => {
      e.preventDefault();
      loadEvents();
    };   

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section and Search */}
      <section className="container flex flex-col items-center px-4 py-12 mx-auto md:py-16 md:flex-row">
        <div className="mb-8 md:w-1/2 md:mb-0">
          <h1 className="text-4xl font-bold leading-tight text-[#29144C] md:text-5xl">
            Matching The Best  <span className="text-[#E17335]">Volunteering</span><br />Opportunities
          </h1>
          <p className="mt-4 text-xl text-[#E17335]">Share Your Skills, Change the World</p>
          {/* Search Box */}
          <form className="flex items-center space-x-2 mt-8 max-w-xl" onSubmit={handleSearch}>
            {/* Search criteria dropdown */}
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
            >
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="mode">Mode</option>
            </select>

            {/* Dynamic input based on criteria */}
            {(searchCriteria === 'name' || searchCriteria === 'location') && (
              <input
                type="text"
                placeholder={`Enter ${searchCriteria}`}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
              />
            )}

            {searchCriteria === 'mode' && (
              <select
                value={mode}
                onChange={e => setMode(e.target.value)}
                className="px-7 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
              >
                <option value="all">All</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </select>
            )}

            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium text-white transition-colors bg-[#29144C] rounded-md hover:bg-purple-900"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex justify-center md:w-1/2">
          <div className="relative w-64 h-64 rounded-full md:w-80 md:h-80">
            <img
              src={hand}
              alt="Volunteer hands"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="text-center text-lg py-8">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No events found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map(event => (
             <EventCard key={event.opportunityId || event.id} event={event} />
     ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
