import React, { useState } from "react";
import { Navbar, Avatar, Dropdown, Button } from "flowbite-react";
import Logo from '../images/Logo.png'
import MakeRequestForm from "./Common/MakeRequestForm";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";


const TopBar = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [modalOn, setModalOn] = useState(false);

  const clicked = () => {
    setModalOn(true)
  }

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
                <div className="block text-lg text-bolder font-bold">
                  <span >{user.first_name}</span> <span >{user.last_name}</span>
                </div>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item>
                My Fulfillments
              </Dropdown.Item>
              <Dropdown.Item>
                My Requests
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <span className='text-red-500 mr-1 font-bold'>Sign out</span>
                <ArrowRightCircleIcon className="h-6 w-6 text-black-500" />
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse className="menu">
            {!token ?
              <Navbar.Link href="/" active={true}>
                Home
              </Navbar.Link> : ""}
            <Navbar.Link href="/profile">
              Profile
            </Navbar.Link>
            <Navbar.Link href="/requests">
              Requests
            </Navbar.Link>
            <Navbar.Link href="/chat">
              Messages
            </Navbar.Link>
            <Navbar.Link>
              <div>
                <Button size="md" gradientMonochrome="teal" onClick={clicked} >
                  <PlusCircleIcon className="h-6 w-6 text-white-500 mr-1" />
                  <span>Requests</span>
                </Button>
              </div>
              {modalOn && < MakeRequestForm setModalOn={setModalOn} />}
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  );
}

export default TopBar;
