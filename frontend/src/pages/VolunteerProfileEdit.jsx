// import React, { useState, useEffect } from 'react';
// import ProfileInfo from '../components/ProfileInfo';
// import SkillsList from '../components/SkillsList';
// import Avatar from '../assets/images/Avatar.png';

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     contact: '',
//     location: '',
//     duration: '',
//     links: '',
//     profilePicture: Avatar
//   });
  
//   const [skills, setSkills] = useState([
//     { name: 'Frontend Development', level: 'Intermediate' },
//     { name: 'Backend Development', level: 'Basic' },
//     { name: 'Database', level: 'Intermediate' },
//     { name: 'Programming', level: 'Expert' },
//     { name: 'Graphic Design', level: 'Basic' }
//   ]);
  
//   useEffect(() => {
//     // Fetch user data from API
//     // This is where you would connect to your backend
//     // Example:
//     // axios.get('/api/user/profile')
//     //   .then(response => {
//     //     setUser(response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error('Error fetching user data:', error);
//     //   });
    
//     // For demo purposes, we'll just use mock data
//     setTimeout(() => {
//       setUser({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         contact: '+1 234 567 8901',
//         location: 'New York, USA',
//         duration: '2 years',
//         links: 'github.com/johndoe',
//         profilePicture: Avatar
//       });
//     }, 500);
//   }, []);
  
//   const handleAddSkill = () => {
//     setSkills([...skills, { name: 'New Skill', level: 'Basic' }]);
//   };
  
//   const handleSaveProfile = () => {
//     // Save profile data to backend
//     // Example:
//     // axios.post('/api/user/profile', { user, skills })
//     //   .then(response => {
//     //     alert('Profile saved successfully!');
//     //   })
//     //   .catch(error => {
//     //     console.error('Error saving profile:', error);
//     //   });
    
//     alert('Profile would be saved to backend in a real app');
//   };
  
//   return (
   
//       <div className="max-w-5xl mx-auto">
//         <h1 className="mb-8 text-3xl font-bold text-gray-800 sr-only">User Profile</h1>
        
//         <ProfileInfo user={user} />
        
//         <div className="mt-8">
//           <h2 className="mb-2 text-xl font-medium text-gray-800">Select Skills</h2>
//           <SkillsList skills={skills} setSkills={setSkills} />
          
//           <div className="flex gap-4 mt-6">
//             {/* <button 
//               onClick={handleAddSkill}
//               className="px-4 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
//             >
//               Add Skill
//             </button> */}
            
//             <button 
//               onClick={handleSaveProfile}
//               className="px-4 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
//             >
//               Save Profile
//             </button>
//           </div>
//         </div>
//       </div>
//   );
// };
// export default Profile;




import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext'; // adjust path as needed
import { updateProfile, getProfile } from '../services/api'; // define these API calls

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  skills: '',
  volunteeringMode: 'online', // online, virtual, both
  socialLinks: {
    facebook: '',
    twitter: '',
    linkedin: '',
  },
  bio: '',
  availability: '',
};

const VolunteerProfileEdit = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          skills: (profile.skills || []).join(', '),
          volunteeringMode: profile.volunteeringMode || 'online',
          socialLinks: {
            facebook: profile.socialLinks?.facebook || '',
            twitter: profile.socialLinks?.twitter || '',
            linkedin: profile.socialLinks?.linkedin || '',
          },
          bio: profile.bio || '',
          availability: profile.availability || '',
        });
      } catch (e) {
        setError('Failed to load profile');
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()).filter((s) => s),
      };
      await updateProfile(updateData);
      setCurrentUser(updateData);
      alert('Profile updated successfully');
    } catch {
      setError('Failed to save profile');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Volunteer Profile</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Skills (comma separated)</label>
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Teamwork, Event Planning, First Aid"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Volunteering Mode</label>
          <select
            name="volunteeringMode"
            value={formData.volunteeringMode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="online">Online</option>
            <option value="virtual">Virtual</option>
            <option value="both">Both</option>
          </select>
        </div>
        <fieldset className="space-y-2">
          <legend className="font-medium">Social Links</legend>
          <div>
            <label>Facebook</label>
            <input
              name="socialLinks.facebook"
              value={formData.socialLinks.facebook}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://facebook.com/yourprofile"
            />
          </div>
          <div>
            <label>Twitter</label>
            <input
              name="socialLinks.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://twitter.com/yourprofile"
            />
          </div>
          <div>
            <label>LinkedIn</label>
            <input
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </fieldset>
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Tell us about yourself"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Availability (Duration)</label>
          <input
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Weekdays 6pm-9pm"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`px-6 py-3 rounded text-white font-semibold ${saving ? 'bg-gray-400' : 'bg-[#E17335] hover:bg-[#29144C]'}`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerProfileEdit;
