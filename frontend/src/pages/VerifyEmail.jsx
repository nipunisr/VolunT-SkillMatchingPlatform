import React, { useState } from 'react';
import forgot from "../assets/images/Forgot.png";

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Updated regex without unnecessary escape characters
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!email.toLowerCase().startsWith('john')) {
      setError('Email must start with "john"');
      return;
    }
    setError('');
    // Add your email verification logic here
    console.log('Verify email for:', email);
  };

  return (
    <div className="w-full max-w-md px-4 sm:px-6 md:px-8 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#29142C] mb-6">Reset Password</h2>
      
      <div className="mb-6 text-center">
        <img src={forgot} alt="Reset password illustration" className="mx-auto max-w-40 h-auto" />
      </div>

      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter your email starting with john******.com to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Email"
            required
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#E17335] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-200"
        >
          Send Verification Code
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;