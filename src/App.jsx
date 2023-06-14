import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkingToken } from './components/Authentication/checking'
import TopBar from './components/Topbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Request from './pages/Request';
import Chat from './pages/Chat';
import RequestDetail from './pages/RequestDetail';
import UserContext from './context/UserContext';

function App() {

  //hook to run the chekingToken function when the component mounts
  useEffect(() => {
    checkingToken()
  }, [])

  const token = JSON.parse(sessionStorage.getItem('token'));


  return (
    <UserContext.Provider value={{ token }}>
      <Router>
        <>
          <TopBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={token ? <Request /> : <Signup />} />
            <Route path="/login" element={token ? <Request /> : <Login />} />
            <Route path="/profile" element={token ? <Profile /> : <Login />} />
            <Route path="/requests" element={token ? <Request /> : <Login />} />
            <Route path="/chat" element={token ? <Chat /> : <Login />} />
            <Route path="/chat/:user_id" element={token ? <Chat /> : <Login />} />
            <Route path="/request-details" element={token ? <RequestDetail /> : <Login />} />
          </Routes>
        </>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
