"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const NavbarHamburger = ({
  isOpen,
  setIsOpen,
  user,
  handleLogout,
  linksToDisplay,
}) => {
  // Disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <ul
      className={`fixed left-0 right-0 top-[70px] z-50 flex flex-col items-start gap-y-4 bg-slate-200 transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? "h-[calc(100vh-70px)] border-t border-black" : "h-0"
      } overflow-hidden`}
    >
      {/* Navigation links */}
      {
        /* <li className="ml-3 mt-6 py-2">
        <Link
          className="block px-4 text-lg font-medium text-black"
          href="/events"
          onClick={() => setIsOpen(false)}
        >
          Events
        </Link>
      </li>
      <li className="ml-3 py-2">
        <Link
          className="block px-4 text-lg font-medium text-black"
          href="/services"
          onClick={() => setIsOpen(false)}
        >
          Get Services
        </Link>
      </li>
      <li className="ml-3 py-2">
        <Link
          className="block px-4 text-lg font-medium text-black"
          href="/product-owners"
          onClick={() => setIsOpen(false)}
        >
          Product Owners
        </Link>
      </li>
      <li className="ml-3 py-2">
        <Link
          className="block px-4 text-lg font-medium text-black"
          href="/blog"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </Link>
      </li> */
      }
      {linksToDisplay.map((link) => (
        <li key={link.href} className="ml-3 py-2">
          <Link
            className="block px-4 text-lg font-medium text-black"
            href={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}

      {user
        ? (
          <>
            {/* If user is logged in */}
            <li className="ml-3 py-2">
              <Link
                className="block px-4 text-lg font-medium text-black"
                href="/profile"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li className="ml-3 px-4 py-2">
              <button
                className="block w-full rounded bg-orange-500 px-4 py-2 text-lg font-semibold text-white hover:bg-red-600"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          </>
        )
        : (
          <li className="ml-3 px-4 py-2">
            <Link
              className="block w-full rounded bg-orange-500 px-4 py-2 text-lg font-semibold text-white hover:bg-orange-600"
              href="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        )}
    </ul>
  );
};

export default NavbarHamburger;
