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
//axios.defaults.withCredentials = true;

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

// export const updateEventById = async (opportunityId, updateData) => {
//   const response = await axios.put(`http://localhost:5000/api/events/${opportunityId}`, updateData);
//   return response.data.event;
// };

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


export const fetchMatchingEvents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/events/matching');
    return response.data.events || [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Matching events endpoint not implemented, using client-side filtering');
      
      try {
        // Get volunteer profile
        const profileResponse = await axios.get('http://localhost:5000/api/profile');
        const volunteer = profileResponse.data.user;
        
        // Get all events
        const allEvents = await fetchEvents({});
        
        // Filter events based on volunteer's profile
        return filterEventsByVolunteerProfile(allEvents, volunteer);
      } catch (fallbackError) {
        console.error('Failed to filter events client-side:', fallbackError);
        return await fetchEvents({});
      }
    }
    console.error('Error fetching matching events:', error);
    return [];
  }
};

// Enhanced client-side filtering function
const filterEventsByVolunteerProfile = (events, volunteer) => {
  if (!volunteer) return events;
  
  return events.filter(event => {
    // Filter by location (allow remote events or events in the same location)
    const locationMatch = event.isRemote || 
                         !volunteer.location || 
                         !event.location || 
                         event.location.toLowerCase().includes(volunteer.location.toLowerCase());
    
    // Filter by date availability
    let dateMatch = true;
    if (volunteer.availabilityStart && volunteer.availabilityEnd && event.startDate) {
      const eventDate = new Date(event.startDate);
      const availableStart = new Date(volunteer.availabilityStart);
      const availableEnd = new Date(volunteer.availabilityEnd);
      dateMatch = eventDate >= availableStart && eventDate <= availableEnd;
    }
    
    // Filter by skills (if available)
    let skillsMatch = true;
    if (volunteer.skills && volunteer.skills.length > 0 && event.skills) {
      // Check if event has any of the volunteer's skills
      skillsMatch = volunteer.skills.some(skill => 
        event.skills.includes(skill) || 
        (event.description && event.description.toLowerCase().includes(skill.toLowerCase()))
      );
    }
    
    return locationMatch && dateMatch && skillsMatch;
  });
};