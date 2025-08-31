import React, { useState } from 'react';

const VolunteerRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#DC7F22] mb-4">Lets Get Started Doing Good!</h2>
        <p className="mb-4 font-semibold text-gray-800">
          We'll get in touch with organization for you.<br/>
          First, let's help them to get to know you better.<br/>
          Answer their question below.
        </p>
        <label className="block mb-2 font-semibold">
          Is there anything more you want to ask or tell them?
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md h-32 p-2 focus:outline-[#DC7F22] mb-6"
          placeholder="How your skills matching to this.."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="px-6 py-2 border border-[#DC7F22] text-[#DC7F22] rounded-md font-semibold hover:bg-[#DC7F22] hover:text-white transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-[#DC7F22] text-white rounded-md font-semibold hover:bg-[#29144C] transition"
            onClick={() => onSubmit(message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRequestModal;
