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




import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Robust initialization
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    try {
      if (stored && stored !== 'undefined' && stored !== 'null') {
        return JSON.parse(stored);
      }
      return null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data);
      } catch (err) {
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

  const login = async (email, password, userType) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password, userType });
    // Handle API success/failure in response
    if (res.data.success) {
      setUser(res.data.user);
      return { success: true };
    } else {
      return { success: false, error: res.data.msg || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
};


  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    userType: user?.userType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
