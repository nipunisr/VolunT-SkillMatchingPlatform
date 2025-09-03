
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerSearch = ({ onClose }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    email: '',
    location: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    searchVolunteers();
  }, []);

  const searchVolunteers = async (params = searchParams) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const queryParams = new URLSearchParams();
      if (params.name) queryParams.append('name', params.name);
      if (params.email) queryParams.append('email', params.email);
      if (params.location) queryParams.append('location', params.location);
      queryParams.append('page', params.page);
      queryParams.append('limit', params.limit);
      
      const response = await axios.get(`http://localhost:5000/api/volunteers/search?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setVolunteers(response.data.volunteers);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Search failed', error);
      alert('Failed to search volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchVolunteers({ ...searchParams, page: 1 });
  };

  const viewVolunteerDetails = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/volunteers/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSelectedVolunteer(response.data.volunteer);
      setShowDetails(true);
    } catch (error) {
      console.error('Failed to fetch volunteer details', error);
      alert('Failed to load volunteer details');
    }
  };

  const handlePageChange = (newPage) => {
    const newParams = { ...searchParams, page: newPage };
    setSearchParams(newParams);
    searchVolunteers(newParams);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Volunteers</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="bg-gray-50 p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={searchParams.email}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by location"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Volunteers'}
          </button>
          
        </div>
      </form>
      
      {/* Results */}
      {loading ? (
        <div className="text-center py-8">Loading volunteers...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteers.map(volunteer => (
              <div key={volunteer.userId} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-xl font-semibold mb-2">{volunteer.userName}</h3>
                <p className="text-gray-600 mb-2">{volunteer.email}</p>
                <p className="text-gray-600 mb-2">{volunteer.location}</p>
                
                {volunteer.skills && volunteer.skills.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-medium mb-1">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map((skill, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => viewVolunteerDetails(volunteer.userId)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  View Full Profile →
                </button>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      pagination.page === page 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Volunteer Details Modal */}
      {showDetails && selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedVolunteer.userName}'s Profile</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold">Contact Information</h3>
                  <p>Email: {selectedVolunteer.email}</p>
                  <p>Phone: {selectedVolunteer.phoneNumber || 'Not provided'}</p>
                  <p>Location: {selectedVolunteer.location}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Volunteering Preferences</h3>
                  <p>Mode: {selectedVolunteer.volunteeringMode || 'Not specified'}</p>
                  {selectedVolunteer.availabilityStart && selectedVolunteer.availabilityEnd && (
                    <p>Availability: {formatDate(selectedVolunteer.availabilityStart)} to {formatDate(selectedVolunteer.availabilityEnd)}</p>
                  )}
                </div>
              </div>
              
              {selectedVolunteer.bio && (
                <div className="mb-4">
                  <h3 className="font-semibold">Bio</h3>
                  <p className="bg-gray-50 p-4 rounded">{selectedVolunteer.bio}</p>
                </div>
              )}
              
              {selectedVolunteer.skills && selectedVolunteer.skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVolunteer.skills.map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                        {typeof skill === 'object' ? skill.skillName : skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="font-semibold">Social Links</h3>
                <div className="flex space-x-4">
                  {selectedVolunteer.socialFacebook && (
                    <a href={selectedVolunteer.socialFacebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Facebook
                    </a>
                  )}
                  {selectedVolunteer.socialTwitter && (
                    <a href={selectedVolunteer.socialTwitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Twitter
                    </a>
                  )}
                  {selectedVolunteer.socialLinkedin && (
                    <a href={selectedVolunteer.socialLinkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">
                      LinkedIn
                    </a>
                  )}
                  {!selectedVolunteer.socialFacebook && !selectedVolunteer.socialTwitter && !selectedVolunteer.socialLinkedin && (
                    <p className="text-gray-500">No social links provided</p>
                  )}
                </div>
              </div>
              
              {selectedVolunteer.recommendations && selectedVolunteer.recommendations.length > 0 ? (
                <div>
                  <h3 className="font-semibold">Recommendations</h3>
                  <div className="space-y-3">
                    {selectedVolunteer.recommendations.map(rec => (
                    <div key={rec.id} className="border-l-4 border-purple-500 pl-4 py-2">
                    <p className="font-medium">{rec.organizationName}</p>
                <p>{rec.message || rec.content}</p>
                <p className="text-sm text-gray-500">
                 {new Date(rec.createdAt).toLocaleDateString()}
                 </p>
                 </div>
              ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">Recommendations</h3>
                  <p className="text-gray-500">No recommendations yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerSearch;