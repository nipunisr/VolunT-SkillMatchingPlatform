import React, { useState, useEffect } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import SkillsList from '../components/SkillsList';
import Avatar from '../assets/images/Avatar.png';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    location: '',
    duration: '',
    links: '',
    profilePicture: '/default-avatar.png'
  });
  
  const [skills, setSkills] = useState([
    { name: 'Frontend Development', level: 'Intermediate' },
    { name: 'Backend Development', level: 'Basic' },
    { name: 'Database', level: 'Intermediate' },
    { name: 'Programming', level: 'Expert' },
    { name: 'Graphic Design', level: 'Basic' }
  ]);
  
  useEffect(() => {
    // Fetch user data from API
    // This is where you would connect to your backend
    // Example:
    // axios.get('/api/user/profile')
    //   .then(response => {
    //     setUser(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user data:', error);
    //   });
    
    // For demo purposes, we'll just use mock data
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '+1 234 567 8901',
        location: 'New York, USA',
        duration: '2 years',
        links: 'github.com/johndoe',
        profilePicture: '/default-avatar.png'
      });
    }, 500);
  }, []);
  
  const handleAddSkill = () => {
    setSkills([...skills, { name: 'New Skill', level: 'Basic' }]);
  };
  
  const handleSaveProfile = () => {
    // Save profile data to backend
    // Example:
    // axios.post('/api/user/profile', { user, skills })
    //   .then(response => {
    //     alert('Profile saved successfully!');
    //   })
    //   .catch(error => {
    //     console.error('Error saving profile:', error);
    //   });
    
    alert('Profile would be saved to backend in a real app');
  };
  
  return (
   
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 sr-only">User Profile</h1>
        
        <ProfileInfo user={user} />
        
        <div className="mt-8">
          <h2 className="mb-2 text-xl font-medium text-gray-800">Select Skills</h2>
          <SkillsList skills={skills} setSkills={setSkills} />
          
          <div className="flex gap-4 mt-6">
            {/* <button 
              onClick={handleAddSkill}
              className="px-4 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Add Skill
            </button> */}
            
            <button 
              onClick={handleSaveProfile}
              className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
  );
};
export default Profile;