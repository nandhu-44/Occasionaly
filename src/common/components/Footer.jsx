// components/Footer.js
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col justify-between border-t bg-gray-200 py-8 lg:px-40">
      {/* Logo Section */}
      <div className="mb-2 flex w-full justify-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={80}
          height={80}
          className="pb-16 text-black"
        />
      </div>

      {/* Links Section */}
      <div className="mb-2 flex flex-col items-center space-y-4 px-4 text-sm text-black md:flex-row md:justify-center md:space-x-4 md:space-y-0">
        <Link href="/privacy-policy" className="font-bold hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms-and-conditions" className="font-bold hover:underline">
          Terms & Conditions
        </Link>
        <Link href="/contact-us" className="font-bold hover:underline">
          Contact Us
        </Link>
      </div>

      {/* Copyright Section */}
      <div className="pt-8 text-center text-sm font-bold text-black">
        OCCASIONALY &copy; 2024
      </div>
    </footer>
  );
};

export default Footer;
