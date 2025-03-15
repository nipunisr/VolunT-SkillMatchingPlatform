import React, { useState } from 'react';
import helping from '../assets/images/helping.png';
import Modal from '../components/Modal';
import VolunteerForm from '../components/VolunteerForm';

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      // Replace with your actual API call
      // await axios.post('/api/volunteer-requests', { 
      //   ...formData,
      //   eventId: 'event-id-here' 
      // });
      
      console.log('Form submitted:', formData);
      setIsModalOpen(false);
      // Show success notification
      alert('Your request has been sent successfully!');
    } catch (error) {
      console.error('Error submitting volunteer request:', error);
      alert('Failed to submit your request. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-44 md:h-64 lg:h-72 overflow-hidden">
        <img 
          src={helping} 
          alt="Volunteers helping each other" 
          className="max-w-7xl h-full object-cover mx-auto"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Event Details Section */}
          <div className="w-full lg:w-2/3 bg-purple-50 rounded-lg shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Community Cleanup and Environmental Awareness Campaign
            </h1>
            <h2 className="text-xl text-gray-700 mt-2">Green Earth Organization</h2>
            
            <div className="mt-6 prose text-gray-600 italic">
              <p>
                Join us for a community cleanup event aimed at raising awareness about environmental sustainability. 
                Volunteers will assist in cleaning up litter in Central Park while educating participants on proper 
                waste disposal and recycling practices. The event will include educational workshops on climate 
                change and how to reduce our carbon footprint.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Benefits:</h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#E17335] mr-2">•</span> Free lunch and refreshments.
                </li>
                <li className="flex items-start">
                  <span className="text-[#E17335] mr-2">•</span> Certificate of participation.
                </li>
                <li className="flex items-start">
                  <span className="text-[#E17335] mr-2">•</span> Opportunity to network with environmental activists.
                </li>
              </ul>
            </div>
            
            <div className="mt-8 text-gray-700">
              <p>Click the I Want to help button to register for the event.</p>
              <p className="mt-2">
                For any questions, please contact our team at{' '}
                <a href="mailto:com@gmail.com" className="text-[#E17335] hover:underline">
                  com@gmail.com
                </a>.
              </p>
            </div>
          </div>
          
          {/* Registration Section */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="w-full">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="block w-full bg-[#E17335] hover:bg-[#E17335]/90 text-[#29142C] text-center py-4 rounded-lg text-lg font-bold transition duration-300"
              >
                I Want To Help
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg shadow-md p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-700 font-medium">E-Mail</h3>
                  <p className="text-gray-900">com@gmail.com</p>
                </div>
                
                <div>
                  <h3 className="text-gray-700 font-medium">Location</h3>
                  <p className="text-gray-900">Colombo</p>
                </div>
                
                <div>
                  <h3 className="text-gray-700 font-medium">Contact</h3>
                  <p className="text-gray-900">0112 354 666</p>
                </div>
                
                <div>
                  <h3 className="text-gray-700 font-medium">Type</h3>
                  <p className="text-gray-900">On site</p>
                </div>
                
                <div>
                  <h3 className="text-gray-700 font-medium">Skills Required</h3>
                  <ul className="mt-1 space-y-1 text-gray-900">
                    <li className="flex items-start">
                      <span className="text-[#E17335] mr-2">•</span> Team Coordination
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E17335] mr-2">•</span> Event Planning Assistance
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E17335] mr-2">•</span> First Aid/CPR
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Lets Get Started Doing Good!"
      >
        <VolunteerForm
          organization="Green Earth Organization"
          onCancel={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default EventPage;