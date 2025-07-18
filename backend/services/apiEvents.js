import axios from 'axios';

export const createEvent = async (eventData) => {
  const response = await axios.post('/api/events', eventData, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};
