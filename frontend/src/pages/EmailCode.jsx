import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import emailcode from "../assets/images/emailcode.png";

// Email Verification Form Component
export const EmailCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'johndoe@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your verification logic here
    navigate('/email-success');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-3xl font-semibold text-gray-800">Email Verification</h1>
          
          {/* Verification Image */}
          <img 
            src={emailcode}
            alt="Verification illustration"
            className="mx-auto mb-6"
          />
          
          <p className="mb-6 text-gray-600">
            We want to make sure it's really you. In order to verify, your E-mail,
            enter the verification code that was sent to {email}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Verification Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Code"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-colors bg-[#E17335] rounded-md hover:bg-orange-600"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};
export default EmailCode;