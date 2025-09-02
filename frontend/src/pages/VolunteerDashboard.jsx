import React, { useState, useEffect, useCallback } from 'react';
import hand from '../assets/images/hand2hand.png';
import EventCard from '../components/Ecards';
import { fetchEvents, fetchMatchingEvents, filterEventsByVolunteerProfile } from '../services/api';

const VolunteerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [matchingEvents, setMatchingEvents] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [keyword, setKeyword] = useState('');
  const [mode, setMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('matching');
  const [userProfile, setUserProfile] = useState(null);
  const [matchThreshold, setMatchThreshold] = useState(30); 

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    setUserProfile(profile);
  }, []);

  const loadInitialEvents = useCallback(async () => {
    setLoading(true);
    try {
      const allData = await fetchEvents({});
      setEvents(allData);
      
      try {
        const matchingData = await fetchMatchingEvents();
        setMatchingEvents(matchingData);
      } catch (matchingError) {
        console.warn('Matching events API failed, using frontend filtering:', matchingError);
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        if (profile) {
          const filteredEvents = filterEventsByVolunteerProfile(allData, profile);
          setMatchingEvents(filteredEvents);
        } else {
          setMatchingEvents([]);
        }
      }
    } catch (err) {
      console.error('Failed to load events:', err);
      setEvents([]);
      setMatchingEvents([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadInitialEvents();
  }, [loadInitialEvents]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setActiveTab('all');
    
    try {
      const filters = {};
      if (searchCriteria === 'name') filters.keyword = keyword.trim();
      else if (searchCriteria === 'location') filters.location = keyword.trim();
      else if (searchCriteria === 'mode' && mode !== 'all') filters.eventType = mode;

      const data = await fetchEvents(filters);
      setEvents(data);
    } catch (err) {
      console.error('Search failed:', err);
      setEvents([]);
    }
    setLoading(false);
  };

  const filteredMatchingEvents = matchingEvents.filter(event => 
    event.matchPercentage >= matchThreshold
  );

  const displayEvents = activeTab === 'matching' ? filteredMatchingEvents : events;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section and Search */}
      <section className="container flex flex-col items-center px-4 py-12 mx-auto md:py-16 md:flex-row">
        <div className="mb-8 md:w-1/2 md:mb-0">
          <h1 className="text-4xl font-bold leading-tight text-[#29144C] md:text-5xl">
            Find  <span className="text-[#E17335]">Volunteering</span><br />Opportunities
          </h1>
          <p className="mt-4 text-xl text-[#E17335]">Share Your Skills, Change the World</p>

          {/* Tab Navigation */}
          <div className="flex mt-6 border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'matching' ? 'text-[#E17335] border-b-2 border-[#E17335]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('matching')}
            >
              Matching Events
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-[#E17335] border-b-2 border-[#E17335]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              All Events
            </button>
          </div>
          
          {/* Match threshold slider for matching events */}
          {activeTab === 'matching' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Match: {matchThreshold}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={matchThreshold}
                onChange={(e) => setMatchThreshold(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
          
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
          <h2 className="text-2xl font-bold text-[#29144C] mb-6">
            {activeTab === 'matching' ? 'Events Matching Your Profile' : 'All Events'}
          </h2>
          
          {loading ? (
            <div className="text-center text-lg py-8">Loading events...</div>
          ) : displayEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {activeTab === 'matching' 
                ? userProfile 
                  ? "No matching events found based on your profile. Try browsing all events instead." 
                  : "Complete your profile to see personalized event matches."
                : "No events found."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayEvents.map(event => (
                <EventCard key={event.opportunityId || event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VolunteerDashboard;