// Login.js
import React, { useState } from 'react';
import UserContext from '../context/UserContext';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    });

    if (response.ok) {
      const data = await response.json();
      const user = data.status.user;
      localStorage.setItem('user', JSON.stringify(user));
      setUserData(user);
      navigate('/'); // Navigate to the home page
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
