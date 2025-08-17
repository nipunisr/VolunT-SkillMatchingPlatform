// import React from 'react';

// const EventCard = ({ event }) => (
//   <div className="rounded-xl bg-purple-100 p-6 w-full max-w-xs shadow">
//     <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
//     <p className="text-sm mb-2">{event.description}</p>
//     <a href={`/events/${event.id}`} className="text-[#E17335] text-sm font-semibold">More</a>
//   </div>
// );

// export default EventCard;




import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/events/${event.opportunityId}`);
  };

  return (
    <div
      className="rounded-xl bg-purple-100 p-6 w-full max-w-xs shadow hover:shadow-lg cursor-pointer transition"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-pressed="false"
      onKeyDown={e => e.key === 'Enter' && handleCardClick()}
    >
      <div className="mb-2 flex justify-between items-center">
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <span className={`text-xs py-1 px-2 rounded-full ${event.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
          {event.status}
        </span>
      </div>
      <p className="text-sm mb-2 text-gray-700 line-clamp-2">{event.description}</p>
      <div className="flex flex-col text-xs mb-2 text-gray-600">
        <span><b>Location:</b> {event.isRemote ? 'Remote' : event.location}</span>
        <span><b>Starts:</b> {event.startDate}</span>
        <span><b>Ends:</b> {event.endDate}</span>
        <span><b>Volunteers:</b> {event.maxVolunteers}</span>
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          navigate(`/events/${event.opportunityId}`);
        }}
        className="mt-2 text-white bg-[#E17335] rounded px-4 py-1 font-semibold hover:bg-[#CE611D] transition"
      >
        More
      </button>
    </div>
  );
};

export default EventCard;
