import React from 'react'
import { Navigate } from "react-router-dom";

const Message = () => {

  const isAuthenticated = false;
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>Message</div>
  )
}

export default Message