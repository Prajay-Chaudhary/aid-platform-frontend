import React from 'react';
import { useState } from 'react';
import User from '../components/User'
import PrivateText from '../components/PrivateText'
const LoginPage = () => {
  const [currUser, setCurrUser] = useState(null);
  return (
    <div className="">
      <User currUser={currUser} setCurrUser={setCurrUser} />
      <PrivateText />
    </div>
  );
}
export default LoginPage;