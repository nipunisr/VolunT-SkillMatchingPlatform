import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchUserProfile = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data.user; 
};

export const updateUserProfile = async (updatedData, token) => {
  const res = await axios.put(`${API_BASE_URL}/profile`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data.user;
};
