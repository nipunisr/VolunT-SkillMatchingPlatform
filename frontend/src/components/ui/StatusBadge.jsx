import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: 'bg-orange-400 text-white',
    approved: 'bg-orange-500 text-white',
    rejected: 'bg-red-500 text-white',
  };

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[status.toLowerCase()]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;