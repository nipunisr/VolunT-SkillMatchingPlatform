import React, { useState } from 'react';

const VolunteerForm = ({ onCancel, onSubmit, organization }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ phoneNumber, additionalInfo });
  };

  return (
    <>
      <p className="text-center text-lg mb-4">We'll get in touch with {organization} for you.</p>
      <p className="text-center mb-6">First, let's help them to get to know you better.<br />Answer their question below.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">
            Please provide your phone number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E17335]"
            placeholder="Contact Number"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">
            Is there anything more you want to ask or tell them?
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E17335] h-32"
            placeholder="How your skills matching to this.."
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-[#E17335] text-[#E17335] rounded-full hover:bg-[#E17335]/10"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-[#E17335] text-white rounded-full hover:bg-[#E17335]/90"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default VolunteerForm;