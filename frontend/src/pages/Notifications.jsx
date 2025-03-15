import React from 'react';

const Notifications = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mx-auto max-w-7xl">
        {/* Notification Cards */}
        <div className="space-y-4">
          {/* Registration Alert 1 */}
          <div className="p-5 bg-orange-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Registration Alert</h3>
            <p className="mt-1 text-gray-800">Com Organization</p>
          </div>
          
          {/* Registration Alert 2 */}
          <div className="p-5 bg-orange-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Registration Alert</h3>
            <p className="mt-1 text-gray-800">Com Organization</p>
          </div>
          
          {/* Registration Alert 3 */}
          <div className="p-5 bg-orange-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Registration Alert</h3>
            <p className="mt-1 text-gray-800">Com Organization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;