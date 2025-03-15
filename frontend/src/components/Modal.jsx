import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4">
        <h2 className="text-2xl text-center text-[#E17335] mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;