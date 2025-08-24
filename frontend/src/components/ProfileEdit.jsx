import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/api';
import VolunteerProfileEdit from './VolunteerProfileEdit';
import OrganizerProfileEdit from './OrganizerProfileEdit';

const ProfileEdit = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (updatedData) => {
    try {
      await updateProfile(updatedData);
      alert('Profile updated successfully');
      setProfile(updatedData); // Optionally refresh or update UI
    } catch {
      alert('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Conditional rendering based on userType field
  if (profile.userType === 'volunteer') {
    return <VolunteerProfileEdit profile={profile} onUpdate={handleUpdate} />;
  } else if (profile.userType === 'organizer') {
    return <OrganizerProfileEdit profile={profile} onUpdate={handleUpdate} />;
  } else {
    return <div>Unknown user type</div>;
  }
};

export default ProfileEdit;
