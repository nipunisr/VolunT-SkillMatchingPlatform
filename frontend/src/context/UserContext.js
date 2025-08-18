
// import React, { createContext, useContext, useEffect, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   // Load user from localStorage when app starts
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setCurrentUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);



import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoadingUser(false);
          return; // no token, no user
        }

        const { data } = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(data);
      } catch (err) {
        console.error('Failed to load profile', err);
        setCurrentUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUserContext = () => useContext(UserContext);
