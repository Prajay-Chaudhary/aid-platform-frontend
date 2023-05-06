import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/Topbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Request from './pages/Request';
// import Chat from './pages/Chat';
import UserContext from './context/UserContext';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));


  console.log(user);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <>
          <TopBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={user ? <Home /> : <Signup />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/profile" element={user ? <Profile /> : <Login />} />
            <Route path="/request" element={user ? <Request /> : <Signup />} />
            {/* <Route path="/chat" element={user ? <Chat /> : <Signup />} /> */}
          </Routes>
        </>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
