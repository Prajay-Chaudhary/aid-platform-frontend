import React from "react";
import { Navbar, Avatar, Dropdown } from "flowbite-react";
import { useNavigate } from 'react-router-dom';


const TopBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    //setUserData(null);
    navigate('/login'); // Navigate to the login page after logout
  }

  return (
    user && (
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="">
          <img
            src=""
            className="mr-3 h-6 sm:h-9"
            alt="Aid Platform"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Aid Platform
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img="" rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {user.name}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>
              Settings
            </Dropdown.Item>
            <Dropdown.Item>
              Earnings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/profile">
            Profile
          </Navbar.Link>
          <Navbar.Link href="/request">
            Request
          </Navbar.Link>
          <Navbar.Link href="/chat">
            Messages
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    )
  );
}

export default TopBar;
