// import axios from 'axios';

// // Existing fetchOpportunities function
// export const fetchOpportunities = async (filters = {}) => {
//   const query = new URLSearchParams(filters).toString();
//   const response = await fetch(`/api/opportunities?${query}`);
//   if (!response.ok) throw new Error('Failed to fetch opportunities');
//   return response.json();
// };

// export const loginUser = (formData) => {
//   return axios.post('http://localhost:5000/api/auth/login', formData);
// };


// export const getProfile = async () => {
//   const token = localStorage.getItem('token');
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   return await axios.get('/api/profile', config);
// };

// export const createEvent = async (eventData) => {
//   const token = localStorage.getItem('token');
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   return axios.post('/api/events/create', eventData, config);
// };


import axios from 'axios';
axios.defaults.withCredentials = true;

// Optional: Set base URL globally if you call same server URLs
// axios.defaults.baseURL = 'http://localhost:5000';

// Add a request interceptor to automatically add token in headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Your existing APIs:

export const fetchOpportunities = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`http://localhost:5000/api/opportunities?${query}`);
  if (!response.ok) throw new Error('Failed to fetch opportunities');
  return response.json();
};

export const loginUser = (formData) => {
  return axios.post('http://localhost:5000/api/auth/login', formData);
};

export const getProfile = () => {
  // Now no need to pass headers manually, interceptor handles it
  return axios.get('http://localhost:5000/api/profile');
};

export const createEvent = async (eventData) => {
  const response = await axios.post('http://localhost:5000/api/events', eventData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};
export const getEventById = async (opportunityId) => {
  const response = await axios.get(`http://localhost:5000/api/events/${opportunityId}`);
  return response.data.event;
};

// export const updateEventById = async (opportunityId, updateData) => {
//   const response = await axios.put(`http://localhost:5000/api/events/${opportunityId}`, updateData);
//   return response.data.event;
// };

export const getEventSkills = async (opportunityId) => {
  const res = await fetch(`http://localhost:5000/api/events/${opportunityId}/skills`);
  const data = await res.json();
  return data.skills || [];
};

// export const updateEventById = async (opportunityId, data) => {
//   const res = await axios.put(`http://localhost:5000/api/events/${opportunityId}`, data);
//   return res.data.event;
// };
export const updateEventById = async (opportunityId, data) => {
  const res = await axios.put(`http://localhost:5000/api/events/${opportunityId}`, data);
  return res.data.event;
};