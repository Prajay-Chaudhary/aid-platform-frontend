import React from "react";
import { Link } from "react-router-dom";

function Button({ text, bg, padding }) {
  return (
    <div>
      <button
        className={`
          ${padding || "px-6 py-2"} text-sm font-semibold uppercase 
          rounded-sm text-white transition ${bg}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900">
      <nav className="flex items-center container mx-auto h-full justify-between">
        <h1 className="font-semibold uppercase text-lg text-gray-200">
          🔄 Demo App
        </h1>
        <div>
          <ul className="flex items-center space-x-10 text-sm">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/message" className="text-gray-400 hover:text-gray-100">
                Messages
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-gray-400 hover:text-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/request" className="text-gray-400 hover:text-gray-100">
                Requests
              </Link>
            </li>
            <li>
              <Link to="/chat" className="text-gray-400 hover:text-gray-100">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/loginpage" className="text-gray-400 hover:text-gray-100">
                Login
              </Link>
            </li>

          </ul>
        </div>
        <div>
          <Button
            text="Login"
            bg="bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
