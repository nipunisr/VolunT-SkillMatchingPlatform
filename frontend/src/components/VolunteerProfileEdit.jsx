import React, { useState } from 'react';

const VolunteerProfileEdit = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    userName: profile.userName || '',
    phoneNumber: profile.phoneNumber || '',
    location: profile.location || '',
    skills: profile.skills || '',
    volunteeringMode: profile.volunteeringMode || 'online',
    socialFacebook: profile.socialFacebook || '',
    socialTwitter: profile.socialTwitter || '',
    socialLinkedin: profile.socialLinkedin || '',
    bio: profile.bio || '',
    availability: profile.availability || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Volunteer Profile</h2>

      <label>Name</label>
      <input name="userName" value={formData.userName} onChange={handleChange} />

      <label>Phone</label>
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

      <label>Location</label>
      <input name="location" value={formData.location} onChange={handleChange} />

      <label>Skills (comma separated)</label>
      <input name="skills" value={formData.skills} onChange={handleChange} />

      <label>Volunteering Mode</label>
      <select name="volunteeringMode" value={formData.volunteeringMode} onChange={handleChange}>
        <option value="online">Online</option>
        <option value="virtual">Virtual</option>
        <option value="both">Both</option>
      </select>

      <label>Facebook</label>
      <input name="socialFacebook" value={formData.socialFacebook} onChange={handleChange} />

      <label>Twitter</label>
      <input name="socialTwitter" value={formData.socialTwitter} onChange={handleChange} />

      <label>LinkedIn</label>
      <input name="socialLinkedin" value={formData.socialLinkedin} onChange={handleChange} />

      <label>Bio</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />

      <label>Availability</label>
      <input name="availability" value={formData.availability} onChange={handleChange} />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default VolunteerProfileEdit;
