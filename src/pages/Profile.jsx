import React, { useContext } from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </div>
      )}

    </div>
  );
}

export default Profile;