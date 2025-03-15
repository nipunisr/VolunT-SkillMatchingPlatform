import React from 'react';
import { Link } from 'react-router-dom';
import hand from '../assets/images/hand2hand.png';

const HomePage = () => {
  // Sample data for volunteer cards
  const volunteerOpportunities = Array(6).fill({
    title: "Love Animal",
    description: "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made."
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container flex flex-col items-center px-4 py-12 mx-auto md:py-16 md:flex-row">
        <div className="mb-8 md:w-1/2 md:mb-0">
          <h1 className="text-4xl font-bold leading-tight text-[#29142C] md:text-5xl">
            Matching The Best <span className="text-[#E17335]">Volunteering</span> <br/>Opportunities
          </h1>
          <p className="mt-4 text-xl text-[#E17335]">Share Your Skills, Change the World</p>
          
          {/* Search Box */}
          <div className="flex w-full max-w-md mt-8">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Colombo"
                className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E17335] focus:border-transparent"
              />
              <button className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <button className="px-6 py-3 text-sm font-medium text-white transition-colors bg-[#29142C] rounded-r-md hover:bg-purple-800">
              Find
            </button>
          </div>
        </div>
        
        <div className="flex justify-center md:w-1/2">
        <div className="relative w-64 h-64 rounded-full md:w-80 md:h-80">
            <img
            src={hand}
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100"/>
          </div>
        </div>
      </section>

      {/* Volunteer Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="p-6 transition-shadow rounded-lg shadow-sm bg-purple-50 hover:shadow-md">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">{opportunity.title}</h3>
                <p className="mb-4 text-gray-600">{opportunity.description}</p>
                <Link to="/selected-opportunity" className="flex justify-end font-medium text-[#E17335] hover:text-[#E17335]">
                  More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;