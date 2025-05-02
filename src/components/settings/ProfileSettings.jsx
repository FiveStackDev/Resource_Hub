import React, { useState } from 'react';

const ProfileSection = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    picture: 'https://avatar.iran.liara.run/public/boy?username=Ash',
    bio: 'Software enthusiast',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    if (formData.bio.length > 100) {
      alert('Bio cannot exceed 100 characters');
      return;
    }
    alert('Profile updated successfully!');
    console.log('Profile:', formData);
  };

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      {formData.picture && (
        <img
          src={formData.picture}
          alt="Profile"
          className="w-16 h-16 rounded-full mb-4"
          onError={() => alert('Invalid image URL')}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            type="url"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSection;