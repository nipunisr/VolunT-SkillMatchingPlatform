import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#29142C] text-white px-4 py-2 rounded-md text-m font-medium"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
