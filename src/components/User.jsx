import React from 'react';
import Signup from "./authentication/Signup";
import Login from './authentication/Login'
import Logout from './authentication/Logout'
import { useState } from "react";
import PrivateText from './PrivateText'

const User = ({ currUser, setCurrUser }) => {
  const [show, setShow] = useState(true)
  if (currUser)
    return (
      <div>
        Hello {currUser.email}
        <PrivateText currUser={currUser} />
        <Logout setCurrUser={setCurrUser} />
      </div>
    )
  return (
    <div>
      {show ?
        <Login setCurrUser={setCurrUser} setShow={setShow} />
        :
        <Signup setCurrUser={setCurrUser} setShow={setShow} />
      }
    </div>
  )
}
export default User