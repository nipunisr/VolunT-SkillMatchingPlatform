import React from 'react';
import { useNavigate } from 'react-router-dom';


const EventCard = ({ event }) => {
  // Extract details
  const navigate = useNavigate();
  const firstLetter = event.title?.charAt(0) || 'E';
  const eventDate = new Date(event.startDate).toLocaleDateString();
  const locationOrRemote = event.isRemote ? 'Remote' : event.location;
  //const hosts = event.hosts || []; // array of { id, avatarUrl, name }

  return (
    <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col justify-between max-w-m">
      {/* Header with colored circle */}
      <div className="flex items-center space-x-4 mb-4">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#29144C] text-white text-xl font-bold"
          style={{ flexShrink: 0 }}
        >
          {firstLetter}
        </div>
        <div>
          <div className="text-sm text-gray-800 font-medium">
            {eventDate} — {locationOrRemote}
          </div>
          <h3 className="text-lg text-[#29144C] font-bold">{event.title}</h3>
        </div>
        
      </div>


      {/* Buttons */}
      <div className="flex flex-col space-y-3">
       <button
          onClick={() => navigate(`/volunteer/dashboard/${event.opportunityId}`)}
          className="bg-[#E17335] text-white rounded-full py-3 font-semibold shadow-md hover:bg-[#29144C] transition"
        >
          More Information
        </button>
      </div>
    </div>
  );
};

export default EventCard;
