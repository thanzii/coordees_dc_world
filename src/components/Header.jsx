import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import coordeesLogoExpand from "../assets/coordeesLogoExpand.svg";
import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import { LogoutIcon } from "../assets/LogoutIcon.jsx";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import addUser from "../assets/add-user.svg";
import loginIcon from "../assets/login.svg";

function Header({ token, logout }) {
  const navigate = useNavigate();

  const isLoggedIn = !!token;
  const location = useLocation();

  const getActiveLinkClass = (path) => {
    return location.pathname === path
      ? "text-[#2cbc61] font-bold"
      : "text-gray-700";
  };

  const handleLogout = () =>
    logout().then(() => navigate("/", { replace: true }));

  return (
    // <div className="flex hcard justify-between">
    //   <img
    //     src={coordeesLogoExpand}
    //     alt="coordeeslogo"
    //     className="h-12 my-2 mx-3"
    //   />
    //   <div className="relative">
    //     <div className="absolute top-0 right-0 p-3">
    //       <Dropdown aria-label="Dropdown" aria-labelledby="Dropdown">
    //         <DropdownTrigger>
    //           <Avatar
    //             icon={<AvatarIcon />}
    //             classNames={{
    //               base: "bg-gradient-to-br from-[#8eebb0] to-[#2cbc61]",
    //               icon: "text-white/80",
    //             }}
    //             isFocusable={true}
    //           />
    //         </DropdownTrigger>
    //         <DropdownMenu
    //           aria-label="Dropdown menu"
    //           aria-labelledby="Dropdown menu"
    //         >
    //           <DropdownItem
    //             key="log out"
    //             onClick={handleLogout}
    //             startContent={<LogoutIcon />}
    //           >
    //             Log Out
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </Dropdown>
    //     </div>
    //   </div>
    // </div>
    <>
      <Navbar isBordered maxWidth="full">
        <NavbarBrand>
          <Image
            src={coordeesLogoExpand}
            alt="coordeeslogo"
            width={180}
            radius="none"
          />
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="mx-4">
            <Link
              color="success"
              href="#"
              aria-current="page"
              className={`text-md font-hanken hover:text-[#2cbc61] ${getActiveLinkClass(
                "/"
              )}`}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem className="mx-4">
            <Link
              href="#"
              color="foreground"
              className={`text-md font-hanken hover:text-[#2cbc61] ${getActiveLinkClass(
                "/about"
              )}`}
            >
              About
            </Link>
          </NavbarItem>
          <NavbarItem className="ml-4 mr-12">
            <Link
              color="foreground"
              href="#"
              className={`text-md font-hanken hover:text-[#2cbc61] ${getActiveLinkClass(
                "/services"
              )}`}
            >
              Services
            </Link>
          </NavbarItem>

          {isLoggedIn ? (
            <Dropdown aria-label="Dropdown" aria-labelledby="Dropdown">
              <DropdownTrigger>
                <Avatar
                  icon={<AvatarIcon />}
                  classNames={{
                    base: "bg-gradient-to-br from-[#8eebb0] to-[#2cbc61]",
                    icon: "text-white/80",
                  }}
                  isFocusable={true}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu"
                aria-labelledby="Dropdown menu"
              >
                <DropdownItem
                  key="log out"
                  onClick={handleLogout}
                  startContent={<LogoutIcon />}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem className="hidden sm:flex">
                <Button
                  href="#"
                  className="border-[#2cbc61] border-1 text-[#2cbc61] bg-transparent text-md font-hanken"
                >
                  Login
                  {/* <div>
                    <img alt="login" src={loginIcon} />
                  </div> */}
                </Button>
              </NavbarItem>

              <NavbarItem>
                <Button
                  as={Link}
                  href="#"
                  variant="solid"
                  className="border-[#2cbc61] border-1 text-white text-md font-hanken bg-[#2cbc61]"
                >
                  Sign Up
                  {/* <div>
                    <img alt="sign-up" src={addUser} />
                  </div> */}
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}

const mapStateToProps = ({ userModel: { token } }) => ({ token });
const mapDispatchToProps = ({ userModel: { logout } }) => ({ logout });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
