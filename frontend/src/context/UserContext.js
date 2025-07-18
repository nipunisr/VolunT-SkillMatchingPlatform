// // src/context/UserContext.js
// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   // You can add logic here to fetch/set current user

//   return (
//     <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to consume the UserContext
// export const useUserContext = () => {
//   return useContext(UserContext);
// };

// export default UserProvider;


// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
