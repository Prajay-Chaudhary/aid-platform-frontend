import React from 'react';

function Profile() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <>
      <div>
        <h1>Profile</h1>
        {user && (
          <div>
            <h1>
              <span>{user.first_name}</span> <span>{user.last_name}</span>
            </h1>
            <h1>{user.email}</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;