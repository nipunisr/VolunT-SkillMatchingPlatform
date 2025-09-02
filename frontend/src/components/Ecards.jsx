import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const firstLetter = event.title?.charAt(0) || 'E';
  const eventDate = event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Flexible dates';
  const locationOrRemote = event.isRemote ? 'Remote' : event.location;

  const getMatchColor = (percentage, tier) => {
    if (tier === 'perfect' || percentage === 100) return 'bg-green-100 text-green-800 border-green-200';
    if (tier === 'excellent' || percentage === 90) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (tier === 'good' || percentage === 30) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (tier === 'fair' || percentage === 10) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transition-transform hover:scale-105 relative">
      {/* Match percentage badge */}
      {event.matchPercentage !== undefined && (
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getMatchColor(event.matchPercentage, event.matchTier)}`}>
          {event.matchPercentage}% Match
        </div>
      )}

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

      {/* Match reason */}
      {event.matchReason && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="text-xs text-gray-600">{event.matchReason}</div>
        </div>
      )}

      {/* Match details */}
      {event.matchDetails && (
        <div className="mb-4">
          <div className="text-xs font-medium text-[#E17335] mb-1">Match details:</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            {event.matchDetails.location && (
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Location match
              </div>
            )}
            {event.matchDetails.dates && (
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Date match
              </div>
            )}
            {event.matchDetails.exactSkills && (
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Skills match
              </div>
            )}
            {event.matchDetails.category && !event.matchDetails.exactSkills && (
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                Category match
              </div>
            )}
            {event.matchDetails.isRemote && (
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                Remote event
              </div>
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