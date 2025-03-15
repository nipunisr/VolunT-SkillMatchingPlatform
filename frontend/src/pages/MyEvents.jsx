import React from 'react';
import EventCard from '../components/MyEventsCard';

const MyEvents = () => {
  // Sample data - in a real app, you would fetch this from your API
  const events = [
    {
      id: 1,
      title: 'Community Cleanup and Environmental Awareness Campaign',
      organization: 'Com Organization',
      date: '22 Dec 2024',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Community Cleanup and Environmental Awareness Campaign',
      organization: 'Com Organization',
      date: '22 Dec 2024',
      status: 'Approved'
    },
    {
      id: 3,
      title: 'Community Cleanup and Environmental Awareness Campaign',
      organization: 'Com Organization',
      date: '22 Dec 2024',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Community Cleanup and Environmental Awareness Campaign',
      organization: 'Com Organization',
      date: '22 Dec 2024',
      status: 'Pending'
    }
  ];

  return (
    <div className='max-w-7xl mx-auto h-full'>
      <div className="bg-gray-400 p-6 rounded-lg ">
        {events.map(event => (
          <EventCard 
            key={event.id}
            title={event.title}
            organization={event.organization}
            date={event.date}
            status={event.status}
          />
        ))}
      </div>
    </div>
  );
};

export default MyEvents;