// Login.js
import React, { useState } from 'react';
import UserContext from '../context/UserContext';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  //make post request for login
  const handleLogin = async (email, password) => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    });

    if (response.ok) {
      const data = await response.json();
      // get token front my back-end throught API and save it to the sessionStorage
      const token = response.headers.get("Authorization")?.split(' ')[1]
      sessionStorage.setItem('token', token)

      console.log("current_user daa with token :", token);
      const user_token = data.status.token;
      sessionStorage.setItem('token', JSON.stringify(token));
      setUserData(user_token);
      navigate('/request'); // Navigate to the request page
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
