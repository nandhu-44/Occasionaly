import { cn } from "@/lib/utils";
import React from "react";

const HomePage = ({ className = "bg-red-500" }) => {
  return (
    <>
      <main className={cn("bg-black", className)}>HomePage</main>
    </>
  );
};

export default HomePage;
