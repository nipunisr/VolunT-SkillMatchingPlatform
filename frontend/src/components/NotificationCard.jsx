import React from 'react';

const NotificationCard = ({ notification }) => {
  // Function to determine background color based on notification type
  const getBgColor = (type) => {
    switch (type) {
      case 'registration':
        return 'bg-orange-100';
      case 'event':
        return 'bg-blue-100';
      case 'reminder':
        return 'bg-green-100';
      case 'urgent':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`${getBgColor(notification.type)} rounded-lg p-5 shadow-sm transition hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{notification.title}</h3>
          <p className="mt-1 text-gray-800">{notification.organization}</p>
          {notification.description && (
            <p className="mt-2 text-gray-700">{notification.description}</p>
          )}
          {notification.date && (
            <p className="mt-2 text-sm text-gray-600">
              {new Date(notification.date).toLocaleDateString()}
            </p>
          )}
        </div>
        {notification.unread && (
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </div>
      
      {notification.actions && (
        <div className="flex gap-2 mt-4">
          {notification.actions.map((action, index) => (
            <button 
              key={index}
              className="px-4 py-2 text-sm font-medium transition bg-white rounded shadow-sm hover:shadow-md"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
