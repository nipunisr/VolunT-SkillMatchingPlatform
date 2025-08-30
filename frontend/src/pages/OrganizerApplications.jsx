import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getOrganizerEventsApplications, updateApplicationStatus } from '../services/api';

const statusColors = {
  pending: 'orange',
  accepted: 'green',
  rejected: 'red',
};

const OrganizerApplications = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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



  if (loading) return <div>Loading events and applications...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6">My Events' Applications</h1>
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
