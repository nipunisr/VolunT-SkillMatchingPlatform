import React, { useState, useEffect } from 'react';
import { getVolunteerRecommendations } from '../services/api';

const VolunteerRecommendations = ({ volunteerId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await getVolunteerRecommendations(volunteerId);
        if (response.data.success) {
          setRecommendations(response.data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (volunteerId) {
      fetchRecommendations();
    }
  }, [volunteerId]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      
      {recommendations.length === 0 ? (
        <p className="text-gray-500">No recommendations yet.</p>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{rec.event_title}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{rec.rating}/5</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-2">{rec.recommendation_text}</p>
              
              <div className="text-sm text-gray-500">
                By {rec.organizer_name} • {new Date(rec.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerRecommendations;