"use client";
import React, { useState } from "react";
import NavbarHamburger from "./NavbarHamburger";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const Hamburger = ({ handleLogout, user, linksToDisplay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        {isOpen
          ? (
            <Cross1Icon
              className="block size-6 h-6 w-6 transform font-semibold text-black transition-transform duration-300 ease-in-out hover:cursor-pointer lg:hidden"
              onClick={toggleMenu}
            />
          )
          : (
            <HamburgerMenuIcon
              className="block size-6 h-6 w-6 transform font-semibold text-black transition-transform duration-300 ease-in-out hover:cursor-pointer lg:hidden"
              onClick={toggleMenu}
            />
          )}
      </div>
      <NavbarHamburger
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
        user={user}
        linksToDisplay={linksToDisplay}
      />
    </>
  );
};

export default Hamburger;
