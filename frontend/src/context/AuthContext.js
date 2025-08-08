// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Create context
// const AuthContext = createContext();

// // Custom hook for consuming context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//   const stored = localStorage.getItem('user');
//   return stored ? JSON.parse(stored) : null; // SAFE!
// });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const res = await axios.get('/api/auth/me');
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadUser();
//   }, []);

//   const login = async (email, password, userType) => {
//     try {
//       const res = await axios.post('/api/auth/login', { email, password, userType });
//       setUser(res.data.user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('/api/auth/logout');
//       setUser(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     isAuthenticated: !!user,
//     userType: user?.userType
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Optional: Default export for legacy components
// export default AuthContext;







// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   // Robust initialization
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem('user');
//     try {
//       if (stored && stored !== 'undefined' && stored !== 'null') {
//         return JSON.parse(stored);
//       }
//       return null;
//     } catch {
//       return null;
//     }
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const res = await axios.get('/api/auth/me');
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadUser();
//   }, []);

//   // Sync user state with localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   const login = async (email, password, userType) => {
//   try {
//     const res = await axios.post('/api/auth/login', { email, password, userType });
//     // Handle API success/failure in response
//     if (res.data.success) {
//       setUser(res.data.user);
//       return { success: true };
//     } else {
//       return { success: false, error: res.data.msg || 'Login failed' };
//     }
//   } catch (error) {
//     return { success: false, error: error.response?.data?.message || 'Login failed' };
//   }
// };


//   const logout = async () => {
//     try {
//       await axios.post('/api/auth/logout');
//       setUser(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     isAuthenticated: !!user,
//     userType: user?.userType
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;






// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Create context
// const AuthContext = createContext();

// // Custom hook for using context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // AuthProvider component
// export const AuthProvider = ({ children }) => {
//   // Initialize user from localStorage (if any)
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
//       try {
//         return JSON.parse(storedUser);
//       } catch {
//         return null;
//       }
//     }
//     return null;
//   });

//   const [loading, setLoading] = useState(true);

//   // Load user info from backend on component mount if token exists
//   useEffect(() => {
//     const loadUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       // Set Authorization header for this request
//       try {
//         const res = await axios.get('/api/auth/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   //Sync user state with localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);


//   const login = async (email, password) => {
//   try {
//     const res = await axios.post('/api/auth/login', { email, password });
//     if (res.data.success) {
//       localStorage.setItem('token', res.data.token);
//       setUser(res.data.user);
//       return { success: true };
//     }
//     return { success: false, error: res.data.message || 'Login failed' };
//   } catch (error) {
//     return { success: false, error: error.response?.data?.message || 'Login failed' };
//   }
// };


//   // Logout method
//   const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   setUser(null);
// };


//   // Value provided via context to consumers
//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if exists
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login method
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: res.data.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout method - clears storage and user state
  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setUser(null);
};


  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
