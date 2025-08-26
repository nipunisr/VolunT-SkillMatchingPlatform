
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VolunteerProfileEdit = ({ profile = {}, onUpdate }) => {
//   const [skillsOptions, setSkillsOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     userName: profile.userName || '',
//     email: profile.email || '',
//     phoneNumber: profile.phoneNumber || '',
//     location: profile.location || '',
//     skills: profile.skills ? profile.skills.split(',') : [], // Array of skill ids/names
//     volunteeringMode: profile.volunteeringMode || 'online',
//     socialFacebook: profile.socialFacebook || '',
//     socialTwitter: profile.socialTwitter || '',
//     socialLinkedin: profile.socialLinkedin || '',
//     bio: profile.bio || '',
//     availabilityStart: profile.availabilityStart || '',
//     availabilityEnd: profile.availabilityEnd || '',
//   });

//   // Fetch skills from backend for dropdown
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/skills') // your API to fetch skills categories
//       .then(res => {
//         setSkillsOptions(res.data.skills || []);
//       }).catch(err => {
//         console.error('Failed to load skills options', err);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked, options } = e.target;
//     if (name === 'skills') {
//       // Multi select skills
//       const selectedSkills = Array.from(options).filter(o => o.selected).map(o => o.value);
//       setFormData(prev => ({ ...prev, skills: selectedSkills }));
//     } else if (type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Convert skills array back to comma separated string for backend
//     const dataToUpdate = {
//       ...formData,
//       skills: formData.skills.join(','),
//     };
//     onUpdate(dataToUpdate);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl p-4 bg-white rounded shadow"> 
    
//       <h2 className="text-xl font-semibold mb-4">Edit Volunteer Profile</h2>

//       <label>Name</label>
//       <input name="userName" value={formData.userName} onChange={handleChange} /> <br/>

//       <label>Email</label>
//       <input name="email" value={formData.email} disabled />  <br/> {/* Usually email not editable */}

//       <label>Phone</label>
//       <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /> <br/>

//       <label>Location</label>
//       <input name="location" value={formData.location} onChange={handleChange} /> <br/>

//       <label>Skills (multi select)</label>
//       <select 
//         name="skills" 
//         value={formData.skills} 
//         onChange={handleChange} 
//         multiple 
//         size={5}
//       >
//         {skillsOptions.map(skill => (
//           <option key={skill.skillId} value={skill.skillName}>{skill.skillName}</option>
//         ))}
//       </select> <br/>

//       <label>Volunteering Mode</label>
//       <select name="volunteeringMode" value={formData.volunteeringMode} onChange={handleChange}>
//         <option value="online">Online</option>
//         <option value="physical">Physical</option>
//         <option value="both">Both</option>
//       </select>

//       <label>Facebook</label>
//       <input name="socialFacebook" value={formData.socialFacebook} onChange={handleChange} />

//       <label>Twitter</label>
//       <input name="socialTwitter" value={formData.socialTwitter} onChange={handleChange} />

//       <label>LinkedIn</label>
//       <input name="socialLinkedin" value={formData.socialLinkedin} onChange={handleChange} />

//       <label>Bio</label>
//       <textarea name="bio" value={formData.bio} onChange={handleChange} />

//       <label>Availability Start Date</label>
//       <input type="date" name="availabilityStart" value={formData.availabilityStart} onChange={handleChange} />

//       <label>Availability End Date</label>
//       <input type="date" name="availabilityEnd" value={formData.availabilityEnd} onChange={handleChange} />

//       <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default VolunteerProfileEdit;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerProfileEdit = ({ profile = {}, onUpdate }) => {
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [formData, setFormData] = useState({
    userName: profile.userName || '',
    email: profile.email || '',
    phoneNumber: profile.phoneNumber || '',
    location: profile.location || '',
    skills: profile.skills ? profile.skills.split(',') : [], // array of skills
    volunteeringMode: profile.volunteeringMode || 'online',
    socialFacebook: profile.socialFacebook || '',
    socialTwitter: profile.socialTwitter || '',
    socialLinkedin: profile.socialLinkedin || '',
    bio: profile.bio || '',
    availabilityStart: profile.availabilityStart || '',
    availabilityEnd: profile.availabilityEnd || '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/skills')
      .then(res => setSkillsOptions(res.data.skills || []))
      .catch(err => console.error('Failed to load skills options', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (name === 'skills') {
      const selectedSkills = Array.from(options).filter(o => o.selected).map(o => o.value);
      setFormData(prev => ({ ...prev, skills: selectedSkills }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      skills: formData.skills.join(','),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-6 bg-white rounded-lg shadow-md mx-auto space-y-6">

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Volunteer Profile</h2>

      <div>
        <label htmlFor="userName" className="block font-medium mb-1">Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block font-medium mb-1">Phone</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          pattern="[\d\s+-]+"
          placeholder="+1 234 567 890"
        />
      </div>

      <div>
        <label htmlFor="location" className="block font-medium mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="skills" className="block font-medium mb-1">Skills (multi-select)</label>
        <select
          id="skills"
          name="skills"
          multiple
          size={5}
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {skillsOptions.map(skill => (
            <option key={skill.skillId} value={skill.skillName}>
              {skill.skillName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="volunteeringMode" className="block font-medium mb-1">Volunteering Mode</label>
        <select
          id="volunteeringMode"
          name="volunteeringMode"
          value={formData.volunteeringMode}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="online">Online</option>
          <option value="physical">Physical</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div>
        <label htmlFor="socialFacebook" className="block font-medium mb-1">Facebook</label>
        <input
          type="url"
          id="socialFacebook"
          name="socialFacebook"
          value={formData.socialFacebook}
          onChange={handleChange}
          placeholder="https://facebook.com/yourprofile"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="socialTwitter" className="block font-medium mb-1">Twitter</label>
        <input
          type="url"
          id="socialTwitter"
          name="socialTwitter"
          value={formData.socialTwitter}
          onChange={handleChange}
          placeholder="https://twitter.com/yourhandle"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="socialLinkedin" className="block font-medium mb-1">LinkedIn</label>
        <input
          type="url"
          id="socialLinkedin"
          name="socialLinkedin"
          value={formData.socialLinkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourprofile"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block font-medium mb-1">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Write something about yourself..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="availabilityStart" className="block font-medium mb-1">Availability Start</label>
          <input
            type="date"
            id="availabilityStart"
            name="availabilityStart"
            value={formData.availabilityStart}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="availabilityEnd" className="block font-medium mb-1">Availability End</label>
          <input
            type="date"
            id="availabilityEnd"
            name="availabilityEnd"
            value={formData.availabilityEnd}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
};

export default VolunteerProfileEdit;
