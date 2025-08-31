import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getMyRegisteredEvents } from '../services/api';  

const statusColors = {
  pending: 'orange',
  accepted: 'green',
  rejected: 'red',
};

const MyRegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMyEvents() {
      try {
        const data = await getMyRegisteredEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch your registered events.');
      } finally {
        setLoading(false);
      }
    }
    fetchMyEvents();
  }, []);

  if (loading) return <div>Loading your registered events...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-4 rounded-lg bg-white shadow">
      <h1 className="text-3xl font-bold mb-6">My Registered Events</h1>
      {events.length === 0 ? (
        <p>You have not registered to any events yet.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Event Name</th>
              <th className="p-3 border-b border-gray-300 text-left">Start Date</th>
              <th className="p-3 border-b border-gray-300 text-left">End Date</th>
              <th className="p-3 border-b border-gray-300 text-left">Application Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map(({ eventId, title, startDate, endDate, status }) => (
              <tr key={eventId} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{title}</td>
                <td className="p-3 border-b border-gray-300">
                  {startDate ? format(parseISO(startDate), 'MMM dd, yyyy') : 'N/A'}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {endDate ? format(parseISO(endDate), 'MMM dd, yyyy') : 'N/A'}
                </td>
                <td className="p-3 border-b border-gray-300">
                  <span
                    className={`px-3 py-1 rounded font-semibold text-white`}
                    style={{ backgroundColor: statusColors[status] || 'gray' }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRegisteredEvents;
