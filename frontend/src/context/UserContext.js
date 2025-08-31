
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoadingUser(false);
          return; 
        }

        const { data } = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(data.user);
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

export const useUserContext = () => useContext(UserContext);
