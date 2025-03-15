import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', { phoneNumber, additionalInfo });
    // Close the modal after submission
    setShowModal(false);
    // You could also show a success message or redirect the user
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-44 md:h-64 lg:h-72 overflow-hidden">
        <img 
          src="/images/volunteer-hero.jpg" 
          alt="Volunteers helping each other" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Event Details Section */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 md:p-8">
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
                  <span className="text-amber-600 mr-2">•</span> Free lunch and refreshments.
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span> Certificate of participation.
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span> Opportunity to network with environmental activists.
                </li>
              </ul>
            </div>
            
            <div className="mt-8 text-gray-700">
              <p>Click the I Want to help button to register for the event.</p>
              <p className="mt-2">
                For any questions, please contact our team at{' '}
                <a href="mailto:com@gmail.com" className="text-amber-600 hover:underline">
                  com@gmail.com
                </a>.
              </p>
            </div>
          </div>
          
          {/* Registration Section */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="w-full">
              <button 
                onClick={handleOpenModal}
                className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-4 rounded-lg text-lg font-medium transition duration-300"
              >
                I Want To Help
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
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
                      <span className="text-amber-600 mr-2">•</span> Team Coordination
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span> Event Planning Assistance
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span> First Aid/CPR
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Media Links */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-center space-x-6">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
      
      {/* Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 flex flex-wrap justify-center gap-x-6 gap-y-2">
        <Link to="/find" className="hover:text-amber-600">Find</Link>
        <span className="hidden md:inline">|</span>
        <Link to="/about-us" className="hover:text-amber-600">About Us</Link>
        <span className="hidden md:inline">|</span>
        <Link to="/create" className="hover:text-amber-600">Create</Link>
        <span className="hidden md:inline">|</span>
        <Link to="/profile" className="hover:text-amber-600">Profile</Link>
        <span className="hidden md:inline">|</span>
        <Link to="/faqs" className="hover:text-amber-600">FAQs</Link>
        <span className="hidden md:inline">|</span>
        <Link to="/terms" className="hover:text-amber-600">Terms and Conditions</Link>
        <span className="hidden md:inline">|</span>
        <Link to="/privacy" className="hover:text-amber-600">Privacy Policy</Link>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleCloseModal}></div>
          
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 md:mx-auto overflow-hidden z-10">
            <div className="px-6 py-8">
              <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">Lets Get Started Doing Good!</h2>
              
              <p className="text-gray-800 text-lg text-center mb-4">
                We'll get in touch with organizatione for you.
              </p>
              
              <p className="text-gray-800 text-lg text-center mb-8">
                First, let's help them to get to know you better.<br />
                Answer their question below.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Please provide your phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded p-3 text-center"
                    placeholder="Contact Number"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="additional-info" className="block text-gray-700 mb-2">
                    Is there anything more you want to ask or tell them?
                  </label>
                  <textarea
                    id="additional-info"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full border border-gray-300 rounded p-3 h-32"
                    placeholder="How your skills matching to this.."
                  ></textarea>
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 py-3 border border-amber-500 text-amber-500 rounded-md hover:bg-amber-50 transition duration-300"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition duration-300"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;