// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import hand from '../assets/images/hand2hand.png';
// import { fetchOpportunities } from '../services/api';

// const HomePage = () => {
//   const [opportunities, setOpportunities] = useState([]);
//   const [location, setLocation] = useState('Colombo');

//   useEffect(() => {
//     const loadOpportunities = async () => {
//       try {
//         const data = await fetchOpportunities({ location });
//         setOpportunities(data);
//       } catch (error) {
//         console.error("Failed to fetch opportunities:", error);
//       }
//     };
//     loadOpportunities();
//   }, [location]);

//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="container flex flex-col items-center px-4 py-12 mx-auto md:py-16 md:flex-row">
//         <div className="mb-8 md:w-1/2 md:mb-0">
//           <h1 className="text-4xl font-bold leading-tight text-[#29142C] md:text-5xl">
//             Matching The Best <span className="text-[#E17335]">Volunteering</span> <br/>Opportunities
//           </h1>
//           <p className="mt-4 text-xl text-[#E17335]">Share Your Skills, Change the World</p>
          
//           {/* Search Box */}
//           <div className="flex w-full max-w-md mt-8">
//             <div className="relative flex-grow">
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E17335] focus:border-transparent"
//               />
//               {location && (
//                 <button 
//                   onClick={() => setLocation('')}
//                   className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               )}
//             </div>
//             <button 
//               onClick={() => {/* Trigger search */}}
//               className="px-6 py-3 text-sm font-medium text-white transition-colors bg-[#29142C] rounded-r-md hover:bg-purple-800"
//             >
//               Find
//             </button>
//           </div>
//         </div>
        
//         <div className="flex justify-center md:w-1/2">
//           <div className="relative w-64 h-64 rounded-full md:w-80 md:h-80">
//             <img
//               src={hand}
//               alt="Volunteer hands"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Volunteer Cards Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container px-4 mx-auto">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {opportunities.map((opportunity) => (
//               <div key={opportunity.id} className="p-6 transition-shadow rounded-lg shadow-sm bg-purple-50 hover:shadow-md">
//                 <h3 className="mb-3 text-xl font-semibold text-gray-800">{opportunity.title}</h3>
//                 <p className="mb-4 text-gray-600 line-clamp-2">{opportunity.description}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-[#E17335]">
//                     {opportunity.location}
//                   </span>
//                   <Link 
//                     to={`/opportunities/${opportunity.id}`}
//                     className="text-sm font-medium text-[#E17335] hover:underline"
//                   >
//                     More
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import hand from '../assets/images/hand2hand.png';
// import { fetchEvents } from '../services/api';

// const VolunteerDashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState('');
//   const [keyword, setKeyword] = useState('');
//   const [loading, setLoading] = useState(true);
//    const [eventType, setEventType] = useState('all'); 

//   // Fetch events from backend API, optionally with filters
//   const loadEvents = async () => {
//     setLoading(true);
//     try {
//       const filters = { location, keyword };
//       if (eventType !== 'all') {
//         filters.eventType = eventType;
//       }
//       const data = await fetchEvents(filters);
//       setEvents(data);
//     } catch (err) {
//       setEvents([]);
//     }
//     setLoading(false);
//   };
//   // Load events on mount and whenever location/keyword changes
//   useEffect(() => {
//     loadEvents();
//     // eslint-disable-next-line
//   }, []);

//   // Search button click handler
//   const handleSearch = (e) => {
//     e.preventDefault();
//     loadEvents();
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Hero Section */}
//       <section className="container flex flex-col items-center px-4 py-12 mx-auto md:py-16 md:flex-row">
//         <div className="mb-8 md:w-1/2 md:mb-0">
//           <h1 className="text-4xl font-bold leading-tight text-[#29142C] md:text-5xl">
//             Find Exciting <span className="text-[#E17335]">Volunteering</span><br />Opportunities
//           </h1>
//           <p className="mt-4 text-xl text-[#E17335]">Share Your Skills, Change the World</p>
//           {/* Search Box */}
//           <form className="flex w-full max-w-xl mt-8" onSubmit={handleSearch}>
//             <input
//               type="text"
//               placeholder="Location"
//               value={location}
//               onChange={e => setLocation(e.target.value)}
//               className="w-1/3 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E17335] focus:border-transparent"
//             />
//             <input
//               type="text"
//               placeholder="Keyword (optional)"
//               value={keyword}
//               onChange={e => setKeyword(e.target.value)}
//               className="w-1/3 px-4 py-3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E17335] focus:border-transparent"
//             />
//             <select
//               value={eventType}
//               onChange={e => setEventType(e.target.value)}
//               className="w-1/6 px-3 py-3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E17335] focus:border-transparent"
//             >
//               <option value="all">All</option>
//               <option value="online">Online</option>
//               <option value="physical">Physical</option>
//             </select>
//             <button
//               type="submit"
//               className="w-1/6 px-6 py-3 text-sm font-medium text-white transition-colors bg-[#29142C] rounded-r-md hover:bg-purple-800"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//         <div className="flex justify-center md:w-1/2">
//           <div className="relative w-64 h-64 rounded-full md:w-80 md:h-80">
//             <img
//               src={hand}
//               alt="Volunteer hands"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Events Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container px-4 mx-auto">
//           {loading ? (
//             <div className="text-center text-lg py-8">Loading events...</div>
//           ) : events.length === 0 ? (
//             <div className="text-center text-gray-500 py-8">No events found.</div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {events.map(event => (
//                 <div
//                   key={event.opportunityId || event.id}
//                   className="p-6 transition-shadow rounded-lg shadow-sm bg-purple-50 hover:shadow-md flex flex-col"
//                 >
//                   <h3 className="mb-3 text-xl font-semibold text-gray-800">{event.title}</h3>
//                   <p className="mb-4 text-gray-600 line-clamp-2">{event.description}</p>
//                   <div className="flex justify-between items-center mt-auto">
//                     <span className="text-sm text-[#E17335]">{event.location}</span>
//                     <Link
//                       to={`/events/${event.opportunityId || event.id}`}
//                       className="text-sm font-medium text-[#E17335] hover:underline"
//                     >
//                       More
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default VolunteerDashboard;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hand from '../assets/images/hand2hand.png';
import { fetchEvents } from '../services/api';
import EventCard from '../components/Ecards';


const VolunteerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('name'); // name, location, mode
  const [keyword, setKeyword] = useState('');
  const [mode, setMode] = useState('all'); // online, physical, all
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
    // eslint-disable-next-line
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
            Find  <span className="text-[#E17335]">Volunteering</span><br />Opportunities
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

export default VolunteerDashboard;
