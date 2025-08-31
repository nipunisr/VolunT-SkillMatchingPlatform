import React, { useState } from 'react';

const OrganizerProfileEdit = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    userName: profile.userName || '',
    phoneNumber: profile.phoneNumber || '',
    location: profile.location || '',
    organizationName: profile.organizationName || '',
    bio: profile.bio || '',
    contactEmail: profile.contactEmail || '',
    website: profile.website || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Organizer Profile</h2>

      <label>Name</label>
      <input name="userName" value={formData.userName} onChange={handleChange} />

      <label>Phone</label>
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

      <label>Location</label>
      <input name="location" value={formData.location} onChange={handleChange} />

      <label>Organization Name</label>
      <input name="organizationName" value={formData.organizationName} onChange={handleChange} />

      <label>Contact Email</label>
      <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} />

      <label>Website</label>
      <input name="website" value={formData.website} onChange={handleChange} />

      <label>Bio</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default OrganizerProfileEdit;
