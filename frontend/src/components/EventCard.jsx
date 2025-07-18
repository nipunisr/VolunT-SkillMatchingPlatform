import React from 'react';

const EventCard = ({ event }) => (
  <div className="rounded-xl bg-purple-100 p-6 w-full max-w-xs shadow">
    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
    <p className="text-sm mb-2">{event.description}</p>
    <a href={`/events/${event.id}`} className="text-[#E17335] text-sm font-semibold">More</a>
  </div>
);

export default EventCard;
