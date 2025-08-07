import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const res = await axios.get('/api/profile', config);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return <div>{profile ? `Hello, ${profile.userName}` : 'Loading...'}</div>;
};
export default Profile;