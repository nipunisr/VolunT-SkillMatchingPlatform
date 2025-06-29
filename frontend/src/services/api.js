// frontend/src/services/api.js
export const fetchOpportunities = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`/api/opportunities?${query}`);
  if (!response.ok) throw new Error('Failed to fetch opportunities');
  return response.json();
};