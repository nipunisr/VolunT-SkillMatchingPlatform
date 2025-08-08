// import React, { useEffect, useState, useCallback } from 'react';
// import EventCard from '../components/EventCard';
// import CreateEventForm from '../components/CreateEventForm';
// import axios from 'axios';
// import image from '../assets/images/org-dash.png';
// import { useUserContext } from '../context/UserContext';

// const OrganizerDashboard = () => {
//   const { currentUser } = useUserContext();
//   const organizerId = currentUser?.userId;
// console.log('Current User:', currentUser);
// console.log('Organizer ID:', organizerId);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   const fetchEvents = useCallback(async () => {
//     if (!organizerId) return;
    
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/events/organizer/${organizerId}`
//       );
      
//       if (response.data.success) {
//         setEvents(response.data.events || []);
//       } else {
//         setError(response.data.message || 'Failed to fetch events');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch events');
//       console.error('Error fetching events:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [organizerId]);

//   useEffect(() => {
//   if (organizerId) {
//     fetchEvents();
//   }
// }, [organizerId, fetchEvents]);

// if (!currentUser || !organizerId) {
//   return (
//     <div className="text-center py-8">
//       <p>Loading user information...</p>
//     </div>
//   );
// }

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Banner */}
//       <div
//         className="relative h-64 rounded-xl overflow-hidden px-4 mx-auto container"
//         style={{
//           backgroundImage: `url(${image})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full px-8 py-6">
//           <button
//             className="bg-gradient-to-r from-purple-900 to-purple-700 text-white px-8 py-3 rounded-lg font-semibold mb-4 md:mb-0 hover:from-purple-800 hover:to-purple-600 transition-colors"
//             onClick={() => setShowCreateForm(true)}
//           >
//             Create an Event +
//           </button>
//         </div>
//       </div>

//       {/* Create Event Modal */}
//       {showCreateForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg max-w-xl w-full relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowCreateForm(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//             <CreateEventForm
//               organizerId={organizerId}
//               onSuccess={() => {
//                 fetchEvents();
//                 setShowCreateForm(false);
//               }}
//               onClose={() => setShowCreateForm(false)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Events List */}
//       <div className="flex gap-6 flex-wrap justify-center px-4 py-8 container mx-auto">
//         {loading ? (
//           <div className="text-center py-8">
//             <p>Loading events...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-8">
//             <p className="text-red-600">{error}</p>
//             <button
//               onClick={fetchEvents}
//               className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//             >
//               Retry
//             </button>
//           </div>
//         ) : events.length === 0 ? (
//           <div className="text-center py-8">
//             <p>No events found. Click "Create an Event" to add your first event.</p>
//           </div>
//         ) : (
//           events.map(event => (
//             <EventCard 
//               key={event.opportunityId} 
//               event={event} 
//               onDelete={fetchEvents}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboard;






import React, { useEffect, useState, useCallback } from 'react';
import EventCard from '../components/EventCard';
import CreateEventForm from '../components/CreateEventForm';
import axios from 'axios';
import image from '../assets/images/org-dash.png';
import { useUserContext } from '../context/UserContext';

const OrganizerDashboard = () => {
  const { currentUser } = useUserContext();
  const organizerId = currentUser?.userId;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchEvents = useCallback(async () => {
    if (!organizerId) return;

    setLoading(true);
    setError('');

    try {
      // Use relative URL, assuming axios baseURL is configured
      const response = await axios.post(`http://localhost:5000/api/events/organizer/${organizerId}`);

      if (response.data.success) {
        setEvents(response.data.events || []);
      } else {
        setError(response.data.message || 'Failed to fetch events');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [organizerId]);

  useEffect(() => {
    if (organizerId) {
      fetchEvents();
    }
  }, [organizerId, fetchEvents]);

  if (!currentUser || !organizerId) {
    return (
      <div className="text-center py-8">
        <p>Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div
        className="relative h-64 rounded-xl overflow-hidden px-4 mx-auto container"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full px-8 py-6">
          <button
            className="bg-gradient-to-r from-purple-900 to-purple-700 text-white px-8 py-3 rounded-lg font-semibold mb-4 md:mb-0 hover:from-purple-800 hover:to-purple-600 transition-colors"
            onClick={() => setShowCreateForm(true)}
          >
            Create an Event +
          </button>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <CreateEventForm
              organizerId={organizerId}
              onSuccess={() => {
                fetchEvents();
                setShowCreateForm(false);
              }}
              onClose={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="flex gap-6 flex-wrap justify-center px-4 py-8 container mx-auto">
        {loading ? (
          <div className="text-center py-8">
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchEvents}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <p>No events found. Click "Create an Event" to add your first event.</p>
          </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.eventId} // Use eventId if that’s the correct unique key
              event={event}
              onDelete={fetchEvents}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
