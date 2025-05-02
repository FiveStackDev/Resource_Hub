import React, { useState } from 'react';

const AccountSection = () => {
  const [formData, setFormData] = useState({
    phone: '+1234567890',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [verify, setVerify] = useState({ type: '', code: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e, type) => {
    e.preventDefault();
    const value = formData[type];
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      alert('Invalid email');
      return;
    }
    if (type === 'phone' && !/^\+?[1-9]\d{1,14}$/.test(value)) {
      alert('Invalid phone number');
      return;
    }
    setVerify({ type, code: '' });
    alert(`Verification code sent to ${value}. Enter code: 1234`);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (verify.code !== '1234') {
      alert('Invalid code');
      return;
    }
    alert(`${verify.type} updated successfully!`);
    setVerify({ type: '', code: '' });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password updated successfully!');
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Account</h2>
      <div className="space-y-6">
        {/* Phone */}
        <div>
          <form onSubmit={(e) => handleContactSubmit(e, 'phone')} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Phone
            </button>
          </form>
        </div>
        {/* Email */}
        <div>
          <form onSubmit={(e) => handleContactSubmit(e, 'email')} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Email
            </button>
          </form>
        </div>
        {/* Verification */}
        {verify.type && (
          <div className="space-y-2">
            <form onSubmit={handleVerify}>
              <label className="block text-sm font-medium text-gray-700">
                Enter Verification Code for {verify.type}
              </label>
              <input
                type="text"
                value={verify.code}
                onChange={(e) => setVerify({ ...verify, code: e.target.value })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Verify
              </button>
            </form>
          </div>
        )}
        {/* Password */}
        <div>
          <form onSubmit={handlePasswordSubmit} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;