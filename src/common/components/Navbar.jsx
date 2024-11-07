"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import Hamburger from "./Hamburger";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const userLinks = {
    user: [
      // { href: "/events", label: "Events" },
      { href: "/create-event", label: "Create Event" },
      // { href: "/services", label: "Vendors" },
    ],
    vendor: [
      // { href: "/events", label: "Events" },
      { href: "/my-bids", label: "My Bids" },
    ],
  };
  const commonLinks = [
    { href: "/events", label: "Events" },
    {
      href: "/contact-us",
      label: "Contact Us",
    },
  ];

  let linksToDisplay =
    user && user.accountType && userLinks[user.accountType]
      ? userLinks[user.accountType]
      : [];
  linksToDisplay = [...commonLinks, ...linksToDisplay];
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 text-center lg:px-32">
      {/* Logo */}
      <Logo />

      {/* Navigation links */}
      <ul className="hidden items-center space-x-4 lg:flex">
        {linksToDisplay.map((link) => (
          <li key={link.href}>
            <Link className="px-4 py-2 hover:underline" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden items-center space-x-6 lg:flex">
        {user ? (
          <>
            {/* If user is logged in */}
            <Link href="/profile">
              <Image
                src="/user-profile.svg"
                alt="User Profile"
                height={32}
                width={32}
                className="h-10 w-10 rounded-full bg-white hover:shadow-lg"
              />
            </Link>
            <button
              className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>

      {/* Hamburger icon for mobile */}
      <Hamburger
        handleLogout={handleLogout}
        user={user}
        linksToDisplay={linksToDisplay}
      />
    </nav>
  );
};

export default Navbar;
