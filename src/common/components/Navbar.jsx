import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 text-center lg:px-32">
      <div className="text-3xl font-bold shadow-yellow-400 drop-shadow-md lg:text-4xl">
        <Link href="/">Occasionaly</Link>
      </div>
      <ul className="hidden space-x-4 lg:flex">
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
        <li>
          <Link
            className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            href="/login"
          >
            LOGIN
          </Link>
        </li>
      </ul>
      <div className="text-3xl font-bold text-black lg:hidden">☰</div>
    </nav>
  );
};

export default Navbar;
