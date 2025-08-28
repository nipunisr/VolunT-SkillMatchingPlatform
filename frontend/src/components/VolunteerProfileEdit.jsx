
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';

const VolunteerProfileEdit = ({ profile = {}, onUpdate }) => {
const [skillsOptions, setSkillsOptions] = useState([]);

const skillsArray = Array.isArray(profile.skills)
  ? profile.skills
  : (typeof profile.skills === 'string' && profile.skills.length > 0)
    ? profile.skills.split(',')   // convert CSV string to array
    : [];                        // fallback to empty array

const initialSelectedSkills = skillsArray.map(skillName => ({ skillName }));

const formatDateForInput = (isoString) => {
  if (!isoString) return '';
  return isoString.split('T')[0]; // extracts "YYYY-MM-DD"
};


  



  const [formData, setFormData] = useState({
    userName: profile.userName || '',
    email: profile.email || '',
    phoneNumber: profile.phoneNumber || '',
    location: profile.location || '',
    skills: initialSelectedSkills,
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
      .then(res => {
        if (res.data.categories) {
          const allSkills = [];
          res.data.categories.forEach(category => {
            category.skills.forEach(skill => {
              allSkills.push({
                value: skill.skillId,
                label: skill.name,
                category: category.name,
              });
            });
          });
          setSkillsOptions(allSkills);
        }
      })
      .catch(err => console.error('Failed to load skills options', err));
  }, []);

  const onSkillsChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      skills: selectedOptions || [],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      // Send array of skill IDs to backend
      skills: formData.skills.map(skill => skill.value),
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
        <Select
          isMulti
          name="skills"
          options={skillsOptions}
          value={formData.skills}
          onChange={onSkillsChange}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select your skills"
          getOptionLabel={(e) => (
            <div>
              <span>{e.label}</span><small className="ml-2 text-gray-500">{e.category}</small>
            </div>
          )}
        />
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
            value={formatDateForInput(formData.availabilityStart)}
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
            value={formatDateForInput(formData.availabilityEnd)}
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
