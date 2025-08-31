// import React, { useEffect, useState } from 'react';
// import { format, parseISO } from 'date-fns';
// import { getOrganizerEventsApplications, updateApplicationStatus } from '../services/api';

// const statusColors = {
//   pending: 'orange',
//   accepted: 'green',
//   rejected: 'red',
// };

// const OrganizerApplications = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchApplications() {
//       try {
//         const data = await getOrganizerEventsApplications();
//         setEvents(data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to load events and applications.');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchApplications();
//   }, []);

//   if (error) {
//   return (
//     <div>
//       <p className="text-red-600 mb-2">{error}</p>
//       <button onClick={() => window.location.reload()} className="underline text-blue-600">
//         Retry
//       </button>
//     </div>
//   );
// }

//   const handleStatusChange = async (application, newStatus) => {
//   try {
//     if (!application?.eventId || !application?.user?.userId) {
//       alert('Incomplete application/user data.');
//       return;
//     }
//     await updateApplicationStatus({
//       eventId: application.eventId,
//       userId: application.user.userId,
//       status: newStatus,
//     });
//     setEvents(prevEvents =>
//       prevEvents.map(event => {
//         if (event.eventId !== application.eventId) return event;
//         return {
//           ...event,
//           applications: event.applications.map(app =>
//             app.user.userId === application.user.userId ? { ...app, status: newStatus } : app
//           ),
//         };
//       })
//     );
//   } catch (err) {
//     const msg = err.response?.data?.message || err.message || 'Status update failed.';
//     alert(msg);
//   }
// };



//   if (loading) return <div>Loading events and applications...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="max-w-6xl mx-auto my-10 p-4 bg-white shadow rounded">
//       <h1 className="text-3xl font-bold mb-6">My Events' Applications</h1>
//       {events.length === 0 && <p>No events or applications found.</p>}

//       {events.map(event => (
//         <div key={event.eventId} className="mb-10 border-b border-gray-300 pb-6">
//           <h2 className="text-xl font-semibold">{event.title}</h2>
//           <p className="mb-2 text-gray-600">
//             {event.startDate ? format(parseISO(event.startDate), 'MMM dd, yyyy') : 'N/A'} - {event.endDate ? format(parseISO(event.endDate), 'MMM dd, yyyy') : 'N/A'}
//           </p>

//           {event.applications.length === 0 ? (
//             <p className="italic">No applications yet.</p>
//           ) : (
//             <table className="w-full border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 border-b">Volunteer Name</th>
//                   <th className="p-2 border-b">Email</th>
//                   <th className="p-2 border-b">Phone</th>
//                   <th className="p-2 border-b">Message</th>
//                   <th className="p-2 border-b">Status</th>
//                   <th className="p-2 border-b">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {event.applications.map(app => (
//                   <tr key={app.volunteerId} className="border-b hover:bg-gray-50">
//                     <td className="p-2">{app.user.name}</td>
//                     <td className="p-2">{app.user.email}</td>
//                     <td className="p-2">{app.user.phone}</td>
//                     <td className="p-2 max-w-xs">{app.message || 'N/A'}</td>
//                     <td className="p-2">
//                       <span
//                         className="px-3 py-1 rounded text-white font-semibold"
//                         style={{ backgroundColor: statusColors[app.status] || 'gray' }}
//                       >
//                         {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="p-2 space-x-2">
//                       {app.status !== 'accepted' && (
//                         <button
//                           onClick={() => handleStatusChange(app, 'accepted')}
//                           className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                         >
//                           Accept
//                         </button>
//                       )}
//                       {app.status !== 'rejected' && (
//                         <button
//                           onClick={() => handleStatusChange(app, 'rejected')}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                         >
//                           Reject
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrganizerApplications;




//Original
// import React, { useEffect, useState } from 'react';
// import { format, parseISO } from 'date-fns';
// import { getOrganizerEventsApplications, updateApplicationStatus, createRecommendation } from '../services/api';

// const statusColors = {
//   pending: 'orange',
//   accepted: 'green',
//   rejected: 'red',
// };

// const OrganizerApplications = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showRecommendationModal, setShowRecommendationModal] = useState(false);
//   const [currentApplication, setCurrentApplication] = useState(null);
//   const [recommendationText, setRecommendationText] = useState('');
//   const [rating, setRating] = useState(5);

//   useEffect(() => {
//     async function fetchApplications() {
//       try {
//         const data = await getOrganizerEventsApplications();
//         setEvents(data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to load events and applications.');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchApplications();
//   }, []);

//   const handleStatusChange = async (application, newStatus) => {
//     try {
//       if (!application?.eventId || !application?.user?.userId) {
//         alert('Incomplete application/user data.');
//         return;
//       }
      
//       await updateApplicationStatus({
//         eventId: application.eventId,
//         userId: application.user.userId,
//         status: newStatus,
//       });
      
//       setEvents(prevEvents =>
//         prevEvents.map(event => {
//           if (event.eventId !== application.eventId) return event;
//           return {
//             ...event,
//             applications: event.applications.map(app =>
//               app.user.userId === application.user.userId ? { ...app, status: newStatus } : app
//             ),
//           };
//         })
//       );
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message || 'Status update failed.';
//       alert(msg);
//     }
//   };

//   const openRecommendationModal = (application) => {
//     console.log('Current Application:', application); 
//     setCurrentApplication(application);
//     setRecommendationText('');
//     setRating(5);
//     setShowRecommendationModal(true);
//   };

//   const closeRecommendationModal = () => {
//     setShowRecommendationModal(false);
//     setCurrentApplication(null);
//   };

//   const submitRecommendation = async () => {
//   try {
//     if (!currentApplication) return;
    
//     // Check if we have the applicationId
//     if (!currentApplication.applicationId) {
//       alert('Error: Cannot find application ID. Please try again.');
//       return;
//     }
    
//     await createRecommendation({
//       application_id: currentApplication.applicationId, // Use applicationId instead of id
//       volunteer_id: currentApplication.user.userId,
//       event_id: currentApplication.eventId,
//       recommendation_text: recommendationText,
//       rating: rating
//     });
    
//     closeRecommendationModal();
//     alert('Recommendation submitted successfully!');
    
//     // Refresh applications to reflect any changes
//     const data = await getOrganizerEventsApplications();
//     setEvents(data);
//   } catch (err) {
//     const msg = err.response?.data?.message || err.message || 'Failed to submit recommendation.';
//     alert(msg);
//   }
// };

//   if (error) {
//     return (
//       <div>
//         <p className="text-red-600 mb-2">{error}</p>
//         <button onClick={() => window.location.reload()} className="underline text-blue-600">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (loading) return <div>Loading events and applications...</div>;

//   return (
//     <div className="max-w-6xl mx-auto my-10 p-4 bg-white shadow rounded">
//       <h1 className="text-3xl font-bold mb-6">My Events' Applications</h1>
      
//       {/* Recommendation Modal */}
//       {showRecommendationModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Add Recommendation</h2>
            
//             <div className="mb-4">
//               <label className="block mb-2">Rating</label>
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(parseInt(e.target.value))}
//                 className="w-full border rounded p-2"
//               >
//                 <option value={5}>5 Stars</option>
//                 <option value={4}>4 Stars</option>
//                 <option value={3}>3 Stars</option>
//                 <option value={2}>2 Stars</option>
//                 <option value={1}>1 Star</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label className="block mb-2">Recommendation</label>
//               <textarea
//                 value={recommendationText}
//                 onChange={(e) => setRecommendationText(e.target.value)}
//                 className="w-full border rounded p-2"
//                 rows="4"
//                 placeholder="Write your recommendation for this volunteer..."
//                 required
//               ></textarea>
//             </div>
            
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={closeRecommendationModal}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitRecommendation}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Add Recommendation
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {events.length === 0 && <p>No events or applications found.</p>}

//       {events.map(event => (
//         <div key={event.eventId} className="mb-10 border-b border-gray-300 pb-6">
//           <h2 className="text-xl font-semibold">{event.title}</h2>
//           <p className="mb-2 text-gray-600">
//             {event.startDate ? format(parseISO(event.startDate), 'MMM dd, yyyy') : 'N/A'} - {event.endDate ? format(parseISO(event.endDate), 'MMM dd, yyyy') : 'N/A'}
//           </p>

//           {event.applications.length === 0 ? (
//             <p className="italic">No applications yet.</p>
//           ) : (
//             <table className="w-full border border-gray-300">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 border-b">Volunteer Name</th>
//                   <th className="p-2 border-b">Email</th>
//                   <th className="p-2 border-b">Phone</th>
//                   <th className="p-2 border-b">Message</th>
//                   <th className="p-2 border-b">Status</th>
//                   <th className="p-2 border-b">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {event.applications.map(app => (
//                   <tr key={app.volunteerId} className="border-b hover:bg-gray-50">
//                     <td className="p-2">{app.user.name}</td>
//                     <td className="p-2">{app.user.email}</td>
//                     <td className="p-2">{app.user.phone}</td>
//                     <td className="p-2 max-w-xs">{app.message || 'N/A'}</td>
//                     <td className="p-2">
//                       <span
//                         className="px-3 py-1 rounded text-white font-semibold"
//                         style={{ backgroundColor: statusColors[app.status] || 'gray' }}
//                       >
//                         {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="p-2 space-x-2">
//                       {app.status !== 'accepted' && (
//                         <button
//                           onClick={() => handleStatusChange(app, 'accepted')}
//                           className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                         >
//                           Accept
//                         </button>
//                       )}
//                       {app.status !== 'rejected' && (
//                         <button
//                           onClick={() => handleStatusChange(app, 'rejected')}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                         >
//                           Reject
//                         </button>
//                       )}
//                       {/* Add Recommendation button for accepted applications */}
//                       {app.status === 'accepted' && (
//                         <button
//                           onClick={() => openRecommendationModal(app)}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                         >
//                           Add Recommendation
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrganizerApplications;





import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getOrganizerEventsApplications, updateApplicationStatus, createRecommendation } from '../services/api';

const statusColors = {
  pending: 'orange',
  accepted: 'green',
  rejected: 'red',
};

const OrganizerApplications = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [recommendationText, setRecommendationText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const data = await getOrganizerEventsApplications();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to load events and applications.');
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const handleStatusChange = async (application, newStatus) => {
    try {
      if (!application?.eventId || !application?.user?.userId) {
        alert('Incomplete application/user data.');
        return;
      }
      
      await updateApplicationStatus({
        eventId: application.eventId,
        userId: application.user.userId,
        status: newStatus,
      });
      
      setEvents(prevEvents =>
        prevEvents.map(event => {
          if (event.eventId !== application.eventId) return event;
          return {
            ...event,
            applications: event.applications.map(app =>
              app.user.userId === application.user.userId ? { ...app, status: newStatus } : app
            ),
          };
        })
      );
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Status update failed.';
      alert(msg);
    }
  };

  const openRecommendationModal = (application) => {
    console.log('Application object:', application); // For debugging
    setCurrentApplication(application);
    setRecommendationText('');
    setRating(5);
    setShowRecommendationModal(true);
  };

  const closeRecommendationModal = () => {
    setShowRecommendationModal(false);
    setCurrentApplication(null);
  };

  const submitRecommendation = async () => {
    try {
      if (!currentApplication) return;
      
      // Use applicationId if available, otherwise use null
      const applicationId = currentApplication.applicationId || currentApplication.id || null;
      
      await createRecommendation({
        application_id: applicationId,
        volunteer_id: currentApplication.user.userId,
        event_id: currentApplication.eventId,
        recommendation_text: recommendationText,
        rating: rating
      });
      
      closeRecommendationModal();
      alert('Recommendation submitted successfully!');
      
      // Refresh applications to reflect any changes
      const data = await getOrganizerEventsApplications();
      setEvents(data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit recommendation.';
      alert(msg);
    }
  };

  if (error) {
    return (
      <div>
        <p className="text-red-600 mb-2">{error}</p>
        <button onClick={() => window.location.reload()} className="underline text-blue-600">
          Retry
        </button>
      </div>
    );
  }

  if (loading) return <div>Loading events and applications...</div>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6">My Events' Applications</h1>
      
      {/* Recommendation Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Recommendation</h2>
            
            <div className="mb-4">
              <label className="block mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full border rounded p-2"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Recommendation</label>
              <textarea
                value={recommendationText}
                onChange={(e) => setRecommendationText(e.target.value)}
                className="w-full border rounded p-2"
                rows="4"
                placeholder="Write your recommendation for this volunteer..."
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeRecommendationModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitRecommendation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Recommendation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {events.length === 0 && <p>No events or applications found.</p>}

      {events.map(event => (
        <div key={event.eventId} className="mb-10 border-b border-gray-300 pb-6">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p className="mb-2 text-gray-600">
            {event.startDate ? format(parseISO(event.startDate), 'MMM dd, yyyy') : 'N/A'} - {event.endDate ? format(parseISO(event.endDate), 'MMM dd, yyyy') : 'N/A'}
          </p>

          {event.applications.length === 0 ? (
            <p className="italic">No applications yet.</p>
          ) : (
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border-b">Volunteer Name</th>
                  <th className="p-2 border-b">Email</th>
                  <th className="p-2 border-b">Phone</th>
                  <th className="p-2 border-b">Message</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {event.applications.map(app => (
                  <tr key={app.volunteerId} className="border-b hover:bg-gray-50">
                    <td className="p-2">{app.user.name}</td>
                    <td className="p-2">{app.user.email}</td>
                    <td className="p-2">{app.user.phone}</td>
                    <td className="p-2 max-w-xs">{app.message || 'N/A'}</td>
                    <td className="p-2">
                      <span
                        className="px-3 py-1 rounded text-white font-semibold"
                        style={{ backgroundColor: statusColors[app.status] || 'gray' }}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-2 space-x-2">
                      {app.status !== 'accepted' && (
                        <button
                          onClick={() => handleStatusChange(app, 'accepted')}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Accept
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusChange(app, 'rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      )}
                      {/* Add Recommendation button for accepted applications */}
                      {app.status === 'accepted' && (
                        <button
                          onClick={() => openRecommendationModal(app)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Add Recommendation
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrganizerApplications;