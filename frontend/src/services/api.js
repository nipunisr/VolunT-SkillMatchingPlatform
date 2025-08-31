


import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);


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
  return axios.get('http://localhost:5000/api/profile');

};

export const updateProfile = async (data) => {
  const res = await axios.put('/api/profile', data);
  return res.data;
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


export const getEventSkills = async (opportunityId) => {
  const res = await fetch(`http://localhost:5000/api/events/${opportunityId}/skills`);
  const data = await res.json();
  return data.skills || [];
};

export const updateEventById = async (opportunityId, data) => {
  const res = await axios.put(`http://localhost:5000/api/events/${opportunityId}`, data);
  return res.data.event;
};

export const fetchEvents = async (filters = {}) => {
  const res = await axios.get('http://localhost:5000/api/events', { params: filters });
  return res.data;
};

export const saveVolunteerRequest = (data) => {
  return axios.post('http://localhost:5000/api/volunteers/request', data);
};

export const getMyRegisteredEvents = () => {
  return axios.get('http://localhost:5000/api/volunteers/my-events')
    .then(res => res.data);
};

export const getOrganizerEventsApplications = () => {
  return axios.get('http://localhost:5000/api/organizer/events-applications').then(res => res.data);
};

export const updateApplicationStatus = ({ eventId, userId, status }) => {
  return axios.put('http://localhost:5000/api/organizer/update-application-status', {
    eventId,
    userId,
    status,
  });
};

export const getStats = () => axios.get(`http://localhost:5000/api/stats`);


export const createRecommendation = async (data) => {
  return axios.post('http://localhost:5000/api/recommendations', data);
};

export const getVolunteerRecommendations = async (volunteerId) => {
  return axios.get(`http://localhost:5000/api/recommendations/volunteer/${volunteerId}`);
};





export const fetchMatchingEvents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/events/matching');
    
    if (Array.isArray(response.data)) {
      return response.data; 
    } else if (response.data && Array.isArray(response.data.events)) {
      return response.data.events; 
    } else {
      console.warn('Unexpected response format from matching events endpoint');
      return await fetchEvents({}); 
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Matching events endpoint not implemented, using client-side filtering');
      
      try {
        const profileResponse = await axios.get('http://localhost:5000/api/profile');
        const volunteer = profileResponse.data.user || profileResponse.data;
        
        const allEvents = await fetchEvents({});
        
        return filterEventsByVolunteerProfile(allEvents, volunteer);
      } catch (fallbackError) {
        console.error('Failed to filter events client-side:', fallbackError);
        return await fetchEvents({});
      }
    }
    console.error('Error fetching matching events:', error);
    return await fetchEvents({}); 
  }
};

const filterEventsByVolunteerProfile = (events, volunteer) => {
  if (!volunteer || !events || events.length === 0) return events;
  
  return events.filter(event => {
    const locationMatch = event.isRemote || 
                         !volunteer.location || 
                         !event.location || 
                         event.location.toLowerCase().includes(volunteer.location.toLowerCase());
    
    let dateMatch = true;
    if (volunteer.availabilityStart && volunteer.availabilityEnd && event.startDate) {
      const eventDate = new Date(event.startDate);
      const availableStart = new Date(volunteer.availabilityStart);
      const availableEnd = new Date(volunteer.availabilityEnd);
      dateMatch = eventDate >= availableStart && eventDate <= availableEnd;
    }
    
    let skillsMatch = true;
    if (volunteer.skills && volunteer.skills.length > 0 && event.requiredSkills) {
      skillsMatch = volunteer.skills.some(skill => 
        event.requiredSkills.includes(skill)
      );
    }
    
    return locationMatch && dateMatch && skillsMatch;
  });
};
