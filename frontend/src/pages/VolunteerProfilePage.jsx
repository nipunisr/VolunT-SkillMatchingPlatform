
import React, { useState, useEffect} from 'react';
import VolunteerProfileEdit from '../components/VolunteerProfileEdit';
import { fetchUserProfile, updateUserProfile } from '../services/profileAPI';

const VolunteerProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    // Map skill names to skill IDs based on known options or fetch mapping if needed
    // Ideally, your backend should accept array of skill IDs for updateUserProfile call
    const skillNames = updatedData.skills; // array of skill names
    // Map to skill IDs from cached skill options (fetch again or cache)
    // For simplicity, assume API accepts names or your backend adapts request accordingly

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
    <VolunteerProfileEdit 
      profile={profile} 
      onUpdate={handleUpdate} 
    />
  );
};

export default VolunteerProfilePage;
