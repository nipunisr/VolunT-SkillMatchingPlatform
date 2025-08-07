import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.userType)) {
    // User role not allowed to access this route
    return <Navigate to="/login" replace />;
  }

  // Allowed to access route
  return children;
};

export default ProtectedRoute;
