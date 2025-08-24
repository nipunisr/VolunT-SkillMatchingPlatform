import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../services/api'; // your existing API function

const EventDetails = () => {
  const { id } = useParams(); // get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
      } catch {
        setEvent(null);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!event) return <div className="p-8">Event not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen bg-white">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left: Event description */}
        <div className="flex-1 bg-gray-100 rounded-lg shadow p-8 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-[#29142C] mb-2">{event.title}</h2>
          <div className="text-xl font-semibold text-gray-700 mb-4">{event.organizationName}</div>
          <p className="italic text-gray-700 mb-6">{event.summary || event.description}</p>
          <p className="text-gray-700 mb-6">{event.fullDescription || event.description}</p>
          {event.benefits && (
            <>
              <div className="font-semibold mb-2">Benefits:</div>
              <ul className="list-disc pl-5 text-gray-700 mb-6">
                {event.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </>
          )}
          <p className="text-sm text-gray-600 mt-8">
            Click the <b>I Want To Help</b> button to register for the event.
            For any questions, please contact us at <b>{event.email}</b>.
          </p>
        </div>

        {/* Right: Sidebar with key info */}
        <aside className="w-full md:w-80 p-6 rounded-lg shadow bg-white flex flex-col space-y-4">
          <button className="py-3 bg-[#E17335] text-white font-semibold rounded-md hover:bg-[#29144C] transition">
            I Want To Help
          </button>
          <div>
            <p><b>E-Mail</b> – {event.email}</p>
            <p><b>Location</b> – {event.isRemote ? 'Remote' : event.location}</p>
            <p><b>Contact</b> : {event.contactNumber}</p>
            <p><b>Type</b> : {event.isRemote ? 'Online' : 'On site'}</p>
            <div className="mt-3 font-semibold">Skills Required:</div>
            <ul className="list-disc pl-5">
              {event.skillsRequired && event.skillsRequired.length > 0 ? (
                event.skillsRequired.map((skill, idx) => <li key={idx}>{skill}</li>)
              ) : (
                <li>None specified</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;
