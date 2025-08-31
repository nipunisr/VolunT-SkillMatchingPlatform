import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const firstLetter = event.title?.charAt(0) || 'E';
  const eventDate = new Date(event.startDate).toLocaleDateString();
  const locationOrRemote = event.isRemote ? 'Remote' : event.location;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transition-transform hover:scale-105">
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#29144C] text-white text-xl font-bold flex-shrink-0">
          {firstLetter}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">
            {eventDate} • {locationOrRemote}
          </div>
          <h3 className="text-lg font-bold text-[#29144C] mb-2">{event.title}</h3>
          <p className="text-sm text-gray-700 line-clamp-2">{event.description}</p>
        </div>
      </div>

      {event.matchingSkills && event.matchingSkills.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-medium text-[#E17335] mb-1">Matches your skills:</div>
          <div className="flex flex-wrap gap-1">
            {event.matchingSkills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                {skill}
              </span>
            ))}
            {event.matchingSkills.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{event.matchingSkills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <button
          onClick={() => navigate(`/volunteer/dashboard/${event.opportunityId}`)}
          className="bg-[#E17335] text-white rounded-full py-2 font-semibold shadow-md hover:bg-[#29144C] transition-colors"
        >
          More Information
        </button>
      </div>
    </div>
  );
};

export default EventCard;