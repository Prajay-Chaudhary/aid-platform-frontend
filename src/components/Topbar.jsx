import React from "react";
import { useContext } from "react";
import { Context } from "../context/Context";
import { Navbar, Avatar, Dropdown } from "flowbite-react";


const TopBar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = ""

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
    >
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
              User Name
            </span>
            <span className="block truncate text-sm font-medium">
              name@example.com
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
        <Navbar.Link
          href="/"
          active={true}
        >
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
        <Navbar.Link href="/login">
          Login
        </Navbar.Link>
        <Navbar.Link href="/signup">
          Signup
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default TopBar;
