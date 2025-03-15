import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import success from "../assets/images/success.png";

export const PasswordUpdated = () => {
    const navigate = useNavigate();
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Password Updated
          </h1>
          
          <img 
            src={success}
            alt="Success illustration"
            className="mx-auto mb-6"
          />
  
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 text-white transition-colors bg-[#E17335] rounded-md hover:bg-orange-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  };
  
export default PasswordUpdated;