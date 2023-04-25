import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import Request from "./pages/Request";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/message" element={<Message />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/request" element={<Request />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
