import React from 'react';
import StatusBadge from './ui/StatusBadge';

const EventCard = ({ title, organization, date, status }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium text-gray-800">{title}</h3>
          <p className="text-gray-700">{organization}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gray-700">{date}</span>
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;