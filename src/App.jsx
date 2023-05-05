import React from "react"
import TopBar from "./components/Topbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Request from "./pages/Request"
import Chat from "./pages/Chat"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={user ? <Home /> : <Signup />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Signup />} />
          <Route path="/request" element={user ? <Request /> : <Signup />} />
          <Route path="/chat" element={user ? <Chat /> : <Signup />} />
        </Routes>
      </>
    </Router>
  )
}

export default App
