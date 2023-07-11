import React, { useState } from 'react';
import UserContext from '../../context/UserContext';
import LoginForm from './Forms/LoginForm';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config/apiConfig';


function LoginMain() {
  const [userData, setUserData] = useState(null);

  //make post request for login
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
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
        toast.success('Login successfull!');
        // Delay the redirect to the request page by 1 second
        setTimeout(() => {
          window.location = '/login';
        }, 1000);
      } else {
        console.error('Login failed');
        toast.error('Invalid Email or password');
      }
    } catch (error) {
      console.error('Login failed');
      toast.error('Invalid Email or password');
    }
  }


  //the LoginForm component is rendered within the UserContext.Provider
  return (
    <UserContext.Provider value={userData}>
      <LoginForm handleLogin={handleLogin} />
    </UserContext.Provider>
  );

}

export default LoginMain;

