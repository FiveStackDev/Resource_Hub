import React from 'react';
import ProfileSection from '../components/settings/ProfileSettings';
import AccountSection from '../components/settings/AccountSettings';

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <ProfileSection />
      <AccountSection />
    </div>
  );
};

export default Settings;