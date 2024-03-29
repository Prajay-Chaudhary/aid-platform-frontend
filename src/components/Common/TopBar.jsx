import React, { useState } from "react";
import { Navbar, Avatar, Dropdown, Button, Tooltip } from "flowbite-react";
import Logo from '../../images/Logo.png'
import MakeRequestForm from "../Requests/MakeRequestForm";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopBar = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [modalOn, setModalOn] = useState(false);
  const navigate = useNavigate();

  const clicked = () => {
    setModalOn(true)
  }

  const redirectToAllMyRequest = () => {
    navigate('/my-requests') // redirect to my AllMyRequest page
  }

  const redirectToProfile = () => {
    navigate('/profile') // redirect to my profile page
  }

  const redirectToChangePassword = () => {
    navigate('update-password') // redirect to Change Password page
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.error("Logout successfully!");

    setTimeout(() => {
      window.location = '/login'; // Navigate to the login page after logout
    }, 2000);

  }



  return (
    token && (
      <>
        <Navbar fluid={true} rounded={true} className="shadow-lg">
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
              <Dropdown.Item onClick={redirectToProfile}>
                <p className="txt-color">My Profile</p>
              </Dropdown.Item>
              <Dropdown.Item onClick={redirectToChangePassword}>
                <p className="txt-color">Change Password</p>
              </Dropdown.Item>
              <Dropdown.Item onClick={redirectToAllMyRequest}>
                <p className="txt-color">My Requests</p>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <span className='txt-color mr-1 font-bold'>Logout</span>
                <ArrowRightCircleIcon className="h-6 w-6 txt-color" />
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse className="menu">
            {!token ?
              <Navbar.Link href="/" active={true}>
                <p className="txt-color">Home</p>
              </Navbar.Link> : ""}
            <Navbar.Link href="/profile">
              <p className="txt-color">Profile</p>
            </Navbar.Link>
            <Navbar.Link href="/requests">
              <p className="txt-color">Requests</p>
            </Navbar.Link>
            <Navbar.Link href="/chat">
              <p className="txt-color">Messages</p>
            </Navbar.Link>
            <Navbar.Link>
              <div>
                <Tooltip
                  content="Click to add a request"
                  placement="right"
                  style="dark"
                >
                  <Button size="md" className="background-color hover:bg-yellow-900 focus:outline-none focus:ring-4 focus:ring-yellow-900 dark:focus:ring-yellow-900" onClick={clicked} >
                    <PlusCircleIcon className="h-6 w-6 text-white-500 mr-1" />
                    <span className="text-white">Request</span>
                  </Button>
                </Tooltip>
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
