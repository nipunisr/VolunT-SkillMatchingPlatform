import axios from 'axios';

// Existing fetchOpportunities function
export const fetchOpportunities = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`/api/opportunities?${query}`);
  if (!response.ok) throw new Error('Failed to fetch opportunities');
  return response.json();
};

// New: Create event function using axios
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/events', eventData, {
      headers: {
        'Content-Type': 'application/json',
        // Include auth token if needed
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginUser = (formData) => {
  return axios.post('http://localhost:5000/api/auth/login', formData);
};
