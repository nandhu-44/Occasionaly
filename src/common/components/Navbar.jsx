"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 text-center lg:px-32">
      {/* Logo */}
      <Logo />

      {/* Navigation links */}
      <ul className="hidden items-center space-x-4 lg:flex">
        <li>
          <Link className="px-4 py-2 hover:underline" href="/events">
            Events
          </Link>
        </li>
        <li>
          <Link className="px-4 py-2 hover:underline" href="/projects">
            Projects
          </Link>
        </li>
        <li>
          <Link className="px-4 py-2 hover:underline" href="/product-owners">
            Product Owners
          </Link>
        </li>
        <li>
          <Link className="px-4 py-2 hover:underline" href="/blog">
            Blog
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            {/* If user is logged in */}
            <li>
              <Link href="/profile">
                <Image
                  src="/user-profile.svg"
                  alt="User Profile"
                  height={32}
                  width={32}
                  className="h-10 w-10 rounded-full bg-white hover:shadow-lg"
                />
              </Link>
            </li>
            <li>
              <button
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              href="/login"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Hamburger icon for mobile */}
      <Hamburger handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
    </nav>
  );
};

export default Navbar;
