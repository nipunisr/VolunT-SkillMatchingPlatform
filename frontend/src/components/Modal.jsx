import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside content
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
