import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkingToken } from './components/Authentication/checking'
import TopBar from "./components/Common/TopBar"
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Request from './pages/Request';
import Chat from './pages/Chat';
import RequestDetail from './pages/RequestDetail';
import UserContext from './context/UserContext';
import MyRequest from './pages/MyRequest';
import ChangePassword from './pages/ChangePassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordReseSendtLink from './pages/PasswordReseSendtLink';
import FulfilledDetails from './pages/FulfilledDetails';
import { token } from './utils/auth';
import Footer from './components/Common/Footer';

function App() {

  //hook to run the chekingToken function when the component mounts
  useEffect(() => {
    checkingToken()
  }, [])


  return (
    <UserContext.Provider value={{ token }}>
      <Router>
        <>
          <ToastContainer />
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
            <Route path="/my-requests" element={token ? <MyRequest /> : <Login />} />
            <Route path="/update-password" element={token ? <ChangePassword /> : <Login />} />
            <Route exact path="/password-reset" element={<PasswordReseSendtLink />} />
            <Route path="/fulfilled-details/:id" element={token ? <FulfilledDetails /> : <Login />} />
          </Routes>
          <Footer />
        </>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
