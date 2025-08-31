
import React, { useState, useEffect } from 'react';
import VolunteerProfileEdit from '../components/VolunteerProfileEdit';
import VolunteerRecommendations from '../components/VolunteerRecommendations';
import { fetchUserProfile, updateUserProfile } from '../services/profileAPI';

const VolunteerProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in');
          setLoading(false);
          return;
        }
        const userData = await fetchUserProfile(token);
        setProfile(userData);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleUpdate = async (updatedData) => {
    try {
      //const skillNames = updatedData.skills; 
      const token = localStorage.getItem('token');
      const updatedUser = await updateUserProfile(updatedData, token);
      setProfile(updatedUser);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Profile update failed');
      console.error(err);
    }
  };

  if (loading) return <div>Loading your profile...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'edit' ? 'text-[#E17335] border-b-2 border-[#E17335]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'recommendations' ? 'text-[#E17335] border-b-2 border-[#E17335]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'edit' ? (
        <VolunteerProfileEdit 
          profile={profile} 
          onUpdate={handleUpdate} 
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <VolunteerRecommendations volunteerId={profile.userId} />
        </div>
      )}
    </div>
  );
};

export default VolunteerProfilePage;