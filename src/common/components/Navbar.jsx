"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";

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
      {/* <div className="text-3xl font-bold shadow-yellow-400 drop-shadow-md lg:text-4xl">
        <Link href="/">Occasionaly</Link>
      </div> */}
      <Logo />

      {/* Navigation links */}
      <ul className="hidden items-center space-x-4 lg:flex">
        <li>
          <Link className="px-4 py-2 hover:underline" href="/events">
            EVENTS
          </Link>
        </li>
        <li>
          <Link className="px-4 py-2 hover:underline" href="/projects">
            PROJECTS
          </Link>
        </li>
        <li>
          <Link className="px-4 py-2 hover:underline" href="/product-owners">
            PRODUCT OWNERS
          </Link>
        </li>
        <li>
          <Link className="px-4 py-2 hover:underline" href="/blog">
            BLOG
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            {/* If user is logged in */}
            <li>
              <Link href="/my-profile">
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
                LOGOUT
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              href="/login"
            >
              LOGIN
            </Link>
          </li>
        )}
      </ul>

      {/* Hamburger icon for mobile */}
      <div className="text-3xl font-bold text-black lg:hidden">☰</div>
    </nav>
  );
};

export default Navbar;
