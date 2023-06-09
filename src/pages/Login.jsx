import React, { useState } from 'react';
import UserContext from '../context/UserContext';
import LoginForm from '../components/LoginForm';

function Login() {
  const [userData, setUserData] = useState(null);

  //make post request for login
  const handleLogin = async (email, password) => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    });

    if (response.ok) {
      // get token front my back-end throught API and save it to the sessionStorage
      const token = response.headers.get("Authorization")?.split(' ')[1]

      const data = await response.json();
      sessionStorage.setItem('token', token)
      // set user data to session storage by converting it to a JSON string
      sessionStorage.setItem('user', JSON.stringify(data.user))

      const user_token = data.status.token;

      // set token to session storage by converting it to a JSON string
      sessionStorage.setItem('token', JSON.stringify(token));
      setUserData(user_token);
      window.location = '/requests'; // Navigate to the request page

    } else {
      console.error('Login failed');
    }
  }

  return (
    <UserContext.Provider value={userData}>
      <LoginForm handleLogin={handleLogin} />
    </UserContext.Provider>
  );

}

export default Login;
