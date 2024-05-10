import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import coordeesLogoExpand from "../assets/coordeesLogoExpand.svg";
import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { LogoutIcon } from "../assets/LogoutIcon.jsx";

function Header({ logout }) {
  const navigate = useNavigate();

  const handleLogout = () =>
    logout().then(() => navigate("/", { replace: true }));

  return (
    <div className="flex hcard justify-between">
      <img
        src={coordeesLogoExpand}
        alt="coordeeslogo"
        className="h-12 my-2 mx-3"
      />
      <div className="relative">
        <div className="absolute top-0 right-0 p-3">
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
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = ({ userModel: { logout } }) => ({ logout });

export default connect(null, mapDispatchToProps)(Header);
