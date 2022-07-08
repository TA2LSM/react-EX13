import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {user.name}</p>
    </div>
  );
};

export default UserProfile;
