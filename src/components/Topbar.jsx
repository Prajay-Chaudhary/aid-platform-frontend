import React from "react";
import { Navbar, Avatar, Dropdown } from "flowbite-react";
import Logo from '../images/Logo.png'


const TopBar = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    //setUserData(null);
    window.location = '/login'; // Navigate to the login page after logout
  }

  return (
    token && (
      <>
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand href="">
            <img
              src={Logo}
              className="ml-3 h-6 sm:h-9"
              alt="Aid Platform"
            />
          </Navbar.Brand>
          <div className="flex md:order-2 z-40">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={<Avatar alt="User settings" img="" rounded={true} />}
            >
              <Dropdown.Header>
                <div className="block text-sm text-bolder">
                  <span >{user.first_name}</span> <span >{user.last_name}</span>
                </div>
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
              <Dropdown.Item onClick={handleLogout} className='text-red-500'>
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            {!user ?
              <Navbar.Link href="/" active={true}>
                Home
              </Navbar.Link> : ""}
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
      </>
    )
  );
}

export default TopBar;
