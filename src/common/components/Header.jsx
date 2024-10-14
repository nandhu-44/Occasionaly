"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import React from "react";

const Header = () => {
  const words = [
    {
      text: "Making",
    },
    {
      text: "your",
    },
    {
      text: "occasions",
      className: "text-yellow-400",
    },
    {
      text: "memorable.",
    },
  ];

  return (
    <header className="px-4 py-8 text-center lg:px-32">
      <h1 className="py-6 text-5xl font-bold text-black lg:text-6xl">
        Occasionaly
      </h1>
      <div className="h-[0.5px] w-full bg-black"></div>
      <div className="py-6 text-3xl text-black lg:text-4xl">
        <TypewriterEffect words={words} />
      </div>
      <div className="h-[0.5px] w-full bg-black"></div>
    </header>
  );
};

export default Header;
